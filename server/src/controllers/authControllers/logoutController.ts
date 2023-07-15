import { Request, Response } from 'express'
import tokenService from '../../services/tokenService.js'
class LogoutController {
	public async logout(req: Request, res: Response) {
		try {
			const token = req.body.token
			if (!token) {
				return res.status(401).json({ error: 'Token not provided' })
			}
			await tokenService.removeRefreshToken(token)
			return res.status(200).json({ message: 'Logged out successfully' })
		} catch (error) {
			console.error('Logout error:', error)
			res.status(500).json({ error: 'Logout failed' })
		}
	}
}

export default new LogoutController()
