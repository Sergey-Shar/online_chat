import express, { Router } from 'express'
import singUpRouter from './signUpRouter.js'
import signInRouter from './signInRouter.js'
import logoutRouter from './logoutRouter.js'
import tokenRouter from './tokenRouter.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const routes:Router = express.Router({ mergeParams: true })

routes.use('/auth', singUpRouter, signInRouter, logoutRouter, tokenRouter)
routes.use('/message', authenticateToken, (req, res) => {
	//@ts-ignore
	const userId = req.userId
	res.status(200).json({ userId, message: 'Message sent successfully' })
})

export default routes