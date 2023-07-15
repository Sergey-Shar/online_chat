import express, { Router } from 'express'
import logoutController from '../../controllers/authControllers/logoutController.js'
const router: Router = express.Router()

router
	.post('/logout',logoutController.logout)
	.bind(logoutController)
export default router
