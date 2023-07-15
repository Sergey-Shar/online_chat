import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const signUpValidationMiddleware = [
	body('username')
		.notEmpty()
		.withMessage('Username is required and must be filled in.'),
	
	body('login')
		.notEmpty()
		.withMessage('Login is required and must be filled in.')
		.isLength({ min: 3, max: 10 })
		.withMessage(
			'Login should have a minimum of three characters and a maximum of ten characters.'
		),

	body('email')
		.notEmpty()
		.withMessage('Email is required and must be filled in.')
		.isEmail()
		.withMessage('Invalid email'),

	body('password')
		.notEmpty()
		.withMessage('Password is required and must be filled in.')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long.'),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
