import mongoose from 'mongoose'

const appointmentSchema = mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services'
    }
  ],
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment