import express from 'express'
import { register, verifyAccount, login, user, forgotPassword, verifyPaaswordResetToken, updatePassword, admin } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

//rutas de autenticacion y registro de usuario

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
  .get(verifyPaaswordResetToken)
  .post(updatePassword)

// Area privada - requiere jwt
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)



export default router