import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const signInValidationMiddleware = [

	body('email')
		.notEmpty()
		.withMessage('Почта обязательна для заполнения')
		.isEmail()
		.withMessage('Почта имеет некорректный формат'),

	body('password')
		.notEmpty()
		.withMessage('Пароль обязателен для заполнения')
		.isLength({ min: 6 })
		.withMessage('Пароль должен содержать минимум 6 символов'),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		next()
	}
]
