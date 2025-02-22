import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const authMiddleware = async(req, res, next) => {
  const bearer = req.headers.authorization

  if(bearer && bearer.startsWith('Bearer')){

   try {
    const token = bearer.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decoded._id).select(
      "-password -verified -token -__v"
    )
    // console.log(user)
    // res.status(403).json({ msg: 'Tóken válido' })
    
    next()
   } catch (e) {
    const error = new Error('Tóken inválido')
    res.status(403).json({ msg: e.message })

   }

    
  } else {
    const error = new Error('Tóken inválido o inexistente')
    res.status(403).json({ msg: error.message })
  }
  
}

export default authMiddleware