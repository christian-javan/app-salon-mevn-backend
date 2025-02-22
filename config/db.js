import mongoose from 'mongoose'
import colors from 'colors'
export const db = async() => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(colors.bgGreen('Se conecto a la base de datos correctamente'))
    console.log(colors.bgWhite(`${db.connection.host}:${db.connection.port}`))
    // console.log(db.connection)
  } catch (error) {
    console.log(colors.red(`Error: ${error.message}`))
    process.exit(1)
  }
}