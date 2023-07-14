import express, { Router } from 'express'
import tokenController from '../controllers/tokenController.js'

const router: Router = express.Router()

router.post('/refresh-token', tokenController.refresh.bind(tokenController))
export default router
