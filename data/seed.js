import { db } from "../config/db.js"
import dotenv from 'dotenv'
import Services from "../models/Services.js"
import { services } from "./beautyServices.js"
import colors from 'colors'

dotenv.config()
await db()

async function seedDB () {
  try {
    await Services.insertMany(services)
    console.log(colors.green.bold('Se agregaron los servicios correctamente'))
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

async function clearDB() {
  try {
    await Services.deleteMany()
    console.log(colors.green.bold('Se eliminaron los servicios correctamente'))
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if (process.argv[2] === "--import") {
  seedDB()
} else {
  clearDB()
}