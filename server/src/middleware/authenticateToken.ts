import { Request, Response, NextFunction } from 'express'
import tokenService from '../services/tokenService.js'
export const authenticateTokenMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(401).json({ error: 'Token not provided' })
		}
		const isValidToken = tokenService.isValidReAccessToken(token)
		if (!isValidToken) {
			return res.status(401).json({ error: 'Invalid token, not authorized' })
		}
		//@ts-ignore
		req.userId = isValidToken._id
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token, not authorized' })
	}
	next()
}
