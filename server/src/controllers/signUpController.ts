import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User, { UserDocument } from '../models/User.js'
import tokenService from '../services/tokenService.js'

class SignUpController {
	public async register(req: Request, res: Response): Promise<void> {
		try {
      const { username, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 12)
      const existingUser: UserDocument | null = await User.findOne({ email })
      
			if (existingUser) {
				res.status(400).json({ error: 'User with this username already exists' })
				return
			}

			const newUser  =  await User.create({ username, email, password: hashedPassword })
    
      const tokens =  tokenService.generateNewToken({ _id: newUser._id })
      await tokenService.saveToken(newUser._id, tokens.refreshToken)

			res.status(201).json({ ...tokens, userId: newUser._id, message: 'Registration successful' })
		} catch (error) {
			console.error('Registration error:', error)
			res.status(500).json({ error: 'Registration failed' })
		}
	}
}

export default new SignUpController()
