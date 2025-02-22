import express from 'express'
import { createService, getServiceById, getServices, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()

// router.post('/', createService)
// router.get('/', getServices)

router.route('/')
  .post(createService)
  .get(getServices)

// router.get('/:id', getServiceById)
// router.put('/:id', updateService)
// router.delete('/:id', deleteService)

router.route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService)


export default router