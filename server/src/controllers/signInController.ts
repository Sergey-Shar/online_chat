import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User, { UserDocument } from '../models/User.js'
import tokenService from '../services/tokenService.js'

class SignInController {
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body
			const existingUser: UserDocument | null = await User.findOne({ email })
			if (!existingUser) {
				res.status(400).json({ error: 'User not found. You need to register.' })
				return
			}
			const isPasswordValid = await bcrypt.compare(password, existingUser.password)

			if (!isPasswordValid) {
				res.status(400).json({ error: 'The entered password is not valid.' })
				return
			}

			const tokens = tokenService.generateNewToken({ _id: existingUser._id })
			await tokenService.saveToken(existingUser._id, tokens.refreshToken)

			res.status(200).json({
				...tokens,
				userId: existingUser._id,
				message: 'Login successful'
			})
		} catch (error) {
			console.error('Authentication error:', error)
			res.status(500).json({ error: 'Authentication failed' })
		}
	}
}

export default new SignInController()
