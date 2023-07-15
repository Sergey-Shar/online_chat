import { Request, Response } from 'express'
import tokenService from '../../services/tokenService.js'
import userService from '../../services/userService.js'
import { comparePassword } from '../../utils/hashPassword.js'

class SignInController {
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { login, password } = req.body
  
			const isExistingUser = await userService.isExistUser('login', login)
			console.log(isExistingUser)
			if (!isExistingUser) {
				res.status(400).json({ error: 'User not found. You need to register.' })
				return
			}

			const isPasswordValid = await comparePassword(
				password,
				isExistingUser.password
			)
			if (!isPasswordValid) {
				res.status(400).json({ error: 'The entered password is not valid.' })
				return
			}

			const tokens = tokenService.generateNewToken({ _id: isExistingUser._id })
			await tokenService.saveToken(isExistingUser._id, tokens.refreshToken)

			res.status(200).json({
				...tokens,
				userId: isExistingUser._id,
				message: 'Login successful'
			})
		} catch (error) {
			console.error('Authentication error:', error)
			res.status(500).json({ error: 'Authentication failed' })
		}
	}
}

export default new SignInController()
