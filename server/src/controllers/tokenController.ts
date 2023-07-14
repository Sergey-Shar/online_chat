import { Request, Response } from 'express'
import tokenService from '../services/tokenService.js'

class TokenController {
	public async refresh(req: Request, res: Response) {
		const { refreshToken } = req.body

		const isValidToken = tokenService.isValidRefreshToken(refreshToken)
		console.log(isValidToken)
		const isToken = await tokenService.findRefreshToken(refreshToken)
		console.log(isToken)

		if (!isValidToken || !isToken) {
			return res.status(401).json({ error: 'Invalid token, not authorized' })
		}
		//@ts-ignore
		const tokens = tokenService.generateNewToken({ _id: isValidToken?._id })
		//@ts-ignore
		await tokenService.saveToken(isValidToken?._id, tokens.refreshToken)

		res.status(200).json({
			...tokens,
			//@ts-ignore
			userId: isValidToken?._id
		})
	}
}

export default new TokenController()
