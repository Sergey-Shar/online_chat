import express, { Router } from 'express'
import { authenticateTokenMiddleware } from '../../middleware/authenticateToken.js'
import newChatController from '../../controllers/chatControllers/newChatController.js'
import { newChatValidationMiddleware } from '../../middleware/newChatValidation.js'
const router: Router = express.Router()

router
	.post(
		'/create-new-chat',
		authenticateTokenMiddleware,
		newChatValidationMiddleware ,
		newChatController.create
	)
	.bind(newChatController)
 
export default router
