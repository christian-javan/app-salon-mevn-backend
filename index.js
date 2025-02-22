// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { db } from './config/db.js'

dotenv.config()
// Configurar la aplicacion
const app = express()

// habiblitar recibir datos via body
app.use(express.json())

// Connectar a base de datos
db()

// configurar CORS
const whitelist = [process.env.FRONTEND_URL, undefined] // QUITAR UNDEFFINED EN PRODUCCION

const corsOptions = {
  origin: function(origin, callback) {
    if(whitelist.includes(origin)) {
      // permitir conexión
      callback(null, true)
    } else {
      // no permitir conexión
      callback(new Error('Error de CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

// Definir el puerto
const PORT = process.env.PORT || 57500

// arrancar la app
app.listen(PORT, () => {
  console.log(colors.bgYellow('EL servidor se está ejecutando en el puerto:', colors.black.bold(PORT)))
})
