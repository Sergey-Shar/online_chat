import express, { Router } from 'express'
import signInController from '../../controllers/authControllers/signInController.js'
import { signInValidationMiddleware } from '../../middleware/signInValidation.js'
const router: Router = express.Router()

router
	.post('/signIn', signInValidationMiddleware, signInController.login)
	.bind(signInController)
export default router
