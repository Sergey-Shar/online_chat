import express, { Router } from 'express'
import singUpRouter from './authRoutes/signUpRouter.js'
import signInRouter from './authRoutes/signInRouter.js'
import logoutRouter from './authRoutes/logoutRouter.js'
import tokenRouter from './authRoutes/tokenRouter.js'
import createChatRouter from './chatRoutes/createChatRouter.js'
import getAllChatRouter from './chatRoutes/getAllChat.js'
import { authenticateTokenMiddleware } from '../middleware/authenticateToken.js'

const routes:Router = express.Router({ mergeParams: true })

routes.use('/auth', singUpRouter, signInRouter, logoutRouter, tokenRouter)
routes.use('/chat', createChatRouter, getAllChatRouter)
routes.use('/message', authenticateTokenMiddleware, (req, res) => {
	//@ts-ignore
	const userId = req.userId
	res.status(200).json({ userId, message: 'Message sent successfully' })
})

export default routes