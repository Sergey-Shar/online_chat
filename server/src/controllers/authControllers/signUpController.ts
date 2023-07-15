import { Request, Response } from 'express'
import tokenService from '../../services/tokenService.js'
import userService from '../../services/userService.js'
import { createHashPassword } from '../../utils/hashPassword.js'
class SignUpController {
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const { username, login, email, password } = req.body
			const isExistingUserEmail = await userService.isExistUser('email', email)
			const isExistingUserLogin = await userService.isExistUser('login',login)

			if (isExistingUserEmail) {
				res.status(400).json({ error: 'User with this email already exists' })
				return
			}
			if(isExistingUserLogin) {
				res.status(400).json({ error: 'User with this login already exists' })
				return
			}

			const hashedPassword = await createHashPassword(password)
			const { _id } = await userService.createNewUser(
				username,
				login,
				email,
				hashedPassword
			)
			const tokens = tokenService.generateNewToken({ _id })
			await tokenService.saveToken(_id, tokens.refreshToken)

			res
				.status(201)
				.json({ ...tokens, userId: _id, message: 'Registration successful' })
		} catch (error) {
			console.error('Registration error:', error)
			res.status(500).json({ error: 'Registration failed' })
		}
	}
}

export default new SignUpController()
