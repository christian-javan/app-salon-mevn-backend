import express from 'express'
import { createAppoinment, deleteAppointment, getAppointmentsByDate, getApponmentById, updateAppointment } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .post(authMiddleware, createAppoinment)
  .get(authMiddleware, getAppointmentsByDate)

  router.route('/:id')
    .get(authMiddleware, getApponmentById)
    .put(authMiddleware, updateAppointment)
    .delete(authMiddleware, deleteAppointment)


export default router