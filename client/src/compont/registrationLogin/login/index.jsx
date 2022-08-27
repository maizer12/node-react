import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../../redux/slices/postSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const Login = () => {
	const dispatch = useDispatch()
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onChange',
	})
	const onSubmit = data => {
		reset()
		dispatch(fetchLogin(data))
	}
	const status = useSelector(state => state.posts.userLogin.status)
	if (status) {
		return <Navigate to='/home' />
	}
	return (
		<div className='form'>
			<form className='form__content' onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						placeholder='Электронная почта'
						className='form__input'
						type='text'
						{...register('email', {
							required: '*Поле обязательно к заполнению!',
							maxLength: {
								value: 30,
								message: 'Должно быть максимум 30 символа',
							},
							minLength: {
								value: 6,
								message: 'Должно быть минимум 6 символов',
							},
						})}
					/>
					<p className='form__error'>{errors?.email?.message}</p>
				</div>
				<div className='form__items'>
					<input
						placeholder='Пароль'
						className='form__input'
						{...register('password', {
							required: '*Поле обязательно к заполнению!',
							minLength: {
								value: 6,
								message: 'Минимум должно быть 6 символов',
							},
						})}
						type='password'
					/>
					<p className='form__error'>{errors?.password?.message}</p>
				</div>
				<div className='form__buttons'>
					<button type='submit' className='form__btn'>
						<span>Войти</span>
					</button>
					<button type='reset' className='form__btn'>
						<span>Отменить</span>
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
