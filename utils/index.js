import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { format } from "date-fns"
import es from 'date-fns/locale/es'
function validateObjectId (id, res) {

  if(!mongoose.Types.ObjectId.isValid(id)){
    const error = new Error('El id no es válido')
    return res.status(400).json({
      msg: error.message
    })
  }
}

function handleNotFoundError(msg, res) {
  const error = new Error(msg)
  return res.status(404).json({
    msg: error.message
  })
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (data) => {

  const exp = {
    expiresIn: '30d'
  }
  const token = jwt.sign(data, process.env.SECRET_KEY, exp)
  return token
}

function formatDate(date) {
  return format(date, 'PPPP', { locale: es })
}


export {
  validateObjectId,
  handleNotFoundError,
  uniqueId,
  generateJWT,
  formatDate
}