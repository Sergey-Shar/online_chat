import express, { Router } from 'express'
import logoutController from '../controllers/logoutController.js'
import { signInValidationMiddleware } from '../middleware/signInValidation.js'

const router: Router = express.Router()

router
	.post('/logout',logoutController.logout)
	.bind(logoutController)
export default router
