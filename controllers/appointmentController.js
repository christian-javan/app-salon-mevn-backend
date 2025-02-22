import Appointment from '../models/Appointment.js'
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { validateObjectId, handleNotFoundError, formatDate } from '../utils/index.js'
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailCancelAppointment } from '../emails/appointmentEmailService.js'

const createAppoinment = async (req, res) => {
  try {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    console.log('Desde create appointment:', appointment)

    const newAppointment = new Appointment(appointment)
    const result = await newAppointment.save()

    await sendEmailNewAppointment({
      date: formatDate(result.date),
      time: result.time
    })

    res.json({
      msg: 'Cita almacenada correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

const getAppointmentsByDate = async(req,res) => {
  console.log('Desde appointments by date', req.query)
  const { date } = req.query
  const newDate = parse(date, 'dd/MM/yyyy', new Date())

  if(!isValid(newDate)) {
    const error = new Error('Fecha no válida')
    return res.status(400).json({ msg: error.message })
  }

  const isoDate = formatISO(newDate)
  console.log(isoDate)

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate))
    }
  }). select('time')

  res.json({
    msg: 'Desde appointments by date',
    appointments
  })
}

const getApponmentById = async(req, res) => {
  const { id } = req.params

  // validar por object id
  if(validateObjectId(id, res)) {
    return
  }

  // validar que exista
  const appointment = await Appointment.findById(id).populate('services')
  if(!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if(appointment.user.toString() !== req.user._id.toString()){
    const error = new Error(' No tienes los permisos')
    res.status(403).json({
      msg: error.message
    })
  }

  return res.json(appointment)
}

const updateAppointment = async(req, res) => {
  const { id } = req.params
  // validar por object id
  if(validateObjectId(id, res)) {
    return
  }

  // validar que exista
  const appointment = await Appointment.findById(id).populate('services')
  if(!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if(appointment.user.toString() !== req.user._id.toString()){
    const error = new Error(' No tienes los permisos')
    res.status(403).json({
      msg: error.message
    })
  }

  const { date, time, total, services } = req.body
  appointment.date = date
  appointment.time = time
  appointment.total = total
  appointment.services = services

  try {
    const result = await appointment.save()

    await sendEmailUpdateAppointment({      
      date: formatDate(result.date),
      time: result.time
    })
    return res.json({
      msg: 'Cita actualizada correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteAppointment = async(req, res) => {
  const { id } = req.params

  // validar por object id
  if(validateObjectId(id, res)) {
    return
  }

  // validar que exista
  const appointment = await Appointment.findById(id).populate('services')
  if(!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if(appointment.user.toString() !== req.user._id.toString()){
    const error = new Error(' No tienes los permisos')
    res.status(403).json({
      msg: error.message
    })
  }

  try {
    const result = await appointment.deleteOne()

    await sendEmailCancelAppointment({      
      date: formatDate(appointment.date),
      time: appointment.time
    })

    return res.json({
      msg: 'Cita cancelada correctamente '
    })
  } catch (error) {
    console.log(error)
  }


}

export {
  createAppoinment,
  getAppointmentsByDate,
  getApponmentById,
  updateAppointment,
  deleteAppointment
}