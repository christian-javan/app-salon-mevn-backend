import Appointment from "../models/Appointment.js"

const getUserAppointments = async (req, res) => {
  const { user } = req.params

  try {
    if(user !== req.user._id.toString()) {
      const error = new Error('Accesso denegado')
      return res.status(400).json({
        msg: error.message
      })
    }

    const query = req.user.admin ? { date: { $gte: new Date() } } : { user, date: { $gte: new Date() } };
    const appointments = await Appointment
                                .find(query)
                                .populate('services')
                                .populate({ path: 'user', select: 'name email' })
                                .sort({ date: 'asc' })
    return res.json(appointments)

  } catch (error) {
    console.log(error)
  }

}

export { getUserAppointments }