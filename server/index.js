import express from 'express'
import mongoose from 'mongoose'
import {
	registerValidation,
	loginValidation,
	itemValidation,
} from './validation/auth.js'
import { login, register, getMe } from './controller/UserController.js'
import handleValidationErrors from './validation/handleValidationErrors.js'
import checkAuth from './utils/checkAuth.js'
import { create, getAll, getOne, update } from './controller/PostController.js'
import cors from 'cors'
mongoose
	.connect(
		'mongodb+srv://admin:2SqItb0uN5y03UR9@cluster0.lzgzyfs.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB ok'))
	.catch(err => console.log('DB error', err))
const app = express()

app.use(express.json())
app.use(cors())
app.post('/login', loginValidation, handleValidationErrors, login)
app.post('/register', registerValidation, handleValidationErrors, register)
app.get('/me', checkAuth, getMe)

app.post('/post', itemValidation, handleValidationErrors, create)
app.get('/post', getAll)
app.get('/post/:id', getOne)
app.patch('/post/:id', update)

app.listen(4000, err => {
	if (err) {
		return console.log(err)
	}
	console.log('Сервер запущен!')
})
