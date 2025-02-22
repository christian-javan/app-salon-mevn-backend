import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createService = async (req, res) => {
  
  try {
    const error = new Error('Todos los campos son obligatorios')
    if(Object.values(req.body).includes('')) {
      return res.status(400).json({
        msg: error.message
      })
    }
  
    const service = new Services(req.body)
    const result = await service.save()

    return res.json({
      msg: 'Servicio agregado correctamente',
      result: result
    })    

  } catch (error) {
    console.log(error)
  }
}

const getServices = async(req, res) => {
  try {
    const services = await Services.find()
    res.json(services)
  } catch (error) {
    console.log(error)
  }
}

const getServiceById = async (req, res) => {
  // validar objectid
  const id = req.params.id

  if(validateObjectId(id, res)) return

  //validar que exista
  const service = await Services.findById(id)

  if(!service){
    return handleNotFoundError('El servicio no existe', res)
  }

  //mostrar servicio
  res.json(service)
}

const updateService = async(req, res) => {
  // validar objectid
  const id = req.params.id

  if(validateObjectId(id, res)) return

  //validar que exista
  const service = await Services.findById(id)
  if(!service){
    return handleNotFoundError('El servicio no existe', res)
  }

  service.name = req.body.name || service.name
  service.price = req.body.price || service.price

  try {
    await service.save()
    return res.json({
      msg: 'El servicio se actualizó correctamente',
    })  
  } catch (error) {
    console.log(error)
  }

}

const deleteService = async(req, res) => {
  // validar objectid
  const id = req.params.id

  if(validateObjectId(id, res)) return

  //validar que exista
  const service = await Services.findById(id)
  if(!service){
    return handleNotFoundError('El servicio no existe', res)
  }
  
  try {
    await service.deleteOne()
    res.json({
      msg: 'El servicio se elimino correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
}