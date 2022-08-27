import { body } from "express-validator";


export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({
		min: 5,
	}),
]

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({
		min: 5,
	}),
	body('number', 'Неверно указан номер').isLength({
		min: 12,
	}),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
]
export const itemValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
]