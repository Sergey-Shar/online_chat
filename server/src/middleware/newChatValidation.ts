import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const newChatValidationMiddleware = [
	body('nameChat')
		.notEmpty()
		.withMessage('The chat name cannot be empty.')
		.isLength({ min: 3, max: 30 })
		.withMessage(
			'The chat name should have a minimum of three characters and a maximum of ten characters.'
		),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
