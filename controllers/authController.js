import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
  // Valida todos los campos
  if(Object.values(req.body).includes('')) {

    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({ msg: error.message })

  }

  const { name, email, password } = req.body
  // Evitar duplicados
  const userExists = await User.findOne({ email })
  if(userExists) {
    const error = new Error(`El email ${req.body.email} ya ha sido registrado. Elige otro`)
    return res.status(400).json({ msg: error.message })
  }
  //Validar la extension del password
  const MIN_PASSWORD_LENGTH = 8

  if(password.trim().length < MIN_PASSWORD_LENGTH){
    const error = new Error(`El password debe de contener al menos ${MIN_PASSWORD_LENGTH} caracteres...`)
    return res.status(400).json({ msg: error.message })
  }

  try {

    const user = new User(req.body)
    const result = await user.save()

    const { name, email, token } = result

    sendEmailVerification({
      name,
      email, 
      token
    })

    return res.status(200).json({ msg: 'Usuario creado correctamente. Revisa tu email.' })

  } catch (error) {


    // if(error.toString().search('duplicate key error collection')) {
    //   const error = new Error(`El email ${req.body.email} ya ha sido registrado. Elige otro`)
    //   return res.status(400).json({ msg: error.message })
    // }

  }
}

const verifyAccount = async (req, res) => {

  const { token } = req.params
  const user = await User.findOne({ token })
  console.log(user)

  if(!user) {
    const error = new Error(`Hubo un error, token no válido`)
    return res.status(401).json({ msg: error.message })
  }

  try {
    user.verified = true
    user.token = ''
    await user.save()
    return res.status(200).json({ msg: 'Usurio verificado correctamente.' })
  } catch (error) {
    console.log(error)
  }
  
}

const login = async (req, res) => {
 
  const { email, password } = req.body
  // Revisar que el usuario exista
  const user = await User.findOne({ email })
  if(!user) {
    const error = new Error(`El usuario no existe`)
    return res.status(401).json({ msg: error.message })
  }
  // Revisar que el usuario haya confirmado su cuenta
  if(!user.verified) {
    const error = new Error(`Aún no has confirmado tu cuenta. Revisa tu email y confirma tu cuenta`)
    return res.status(401).json({ msg: error.message })
  }
  // Comprobar que el password sea correcto
  if(await user.checkPassword(password)) {
    try {
      const { _id, name, email, admin } = user
      const payload = { _id, name, email, admin }
      const jwt = generateJWT(payload)
      return res.status(200).json({ msg: 'Login exitoso.', jwt })

    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error(`El password es incorrecto`)
    return res.status(401).json({ msg: error.message })
  }
  
}

const user = async(req, res) => {
  const { user } = req
  console.log(user)
  res.json(user)
}

const admin = async(req, res) => {

  const { user } = req
  console.log(user)
  if(!user.admin) {
    const error = new Error('Acción no válida')
    return res.status(403).json({
      msg: error.message
    })
  }
  res.json(user)
}

const forgotPassword = async(req, res) => {
  const { email } = req.body
  // Revisar que el usuario exista
  const user = await User.findOne({ email })
  if(!user) {
    const error = new Error(`El usuario no existe`)
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = uniqueId()
    const result = await user.save()

    sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token
    })

    res.json({
      msg: 'Hemos enviado el email con las instrucciones'
    })
  } catch (error) {
    console.log(error)
  }

}

const verifyPaaswordResetToken = async (req, res) => {
  const { token } = req.params

  const isValidToken = await User.findOne({ token })

  if(!isValidToken) {
    const error = new Error('Hubo un error, token inválido')
    return res.status(400).json({
      msg: error.message
    })
  }

  return res.json({
    msg: 'Token válido'
  })

}

const updatePassword = async (req, res) => {

  const { token } = req.params

  const user = await User.findOne({ token })

  if(!user) {
    const error = new Error('Hubo un error, token inválido')
    return res.status(400).json({
      msg: error.message
    })
  }

  const { password } = req.body
  try {
    user.token = ''
    user.password = password
    await user.save()
    return res.json({
      msg: 'Password reseteado correctamente'
    })
  } catch (error) {
    console.log(error)
  }

}


export {
  register,
  verifyAccount,
  login, 
  user,
  admin,
  forgotPassword,
  verifyPaaswordResetToken, 
  updatePassword
}