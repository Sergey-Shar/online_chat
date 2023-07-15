import express, { Router } from 'express'
import signUpController from '../../controllers/authControllers/signUpController.js'
import { signUpValidationMiddleware } from '../../middleware/signUpValidation.js'

const router: Router = express.Router()

router
	.post('/signUp', signUpValidationMiddleware, signUpController.register)
	.bind(signUpController) 
export default router