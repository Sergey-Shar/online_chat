import express, { Router } from 'express'
import { authenticateTokenMiddleware } from '../../middleware/authenticateToken.js'
import allChatsController from '../../controllers/chatControllers/allChatsController.js' 
const router: Router = express.Router()

router
	.get(
		'/get-all-chats',
		authenticateTokenMiddleware,
		allChatsController.get
	)
	.bind(allChatsController)

export default router
