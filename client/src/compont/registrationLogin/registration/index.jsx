import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
	fetchRegistration,
	fetchNewItem,
} from '../../../redux/slices/postSlice'
const Registration = () => {
	const dispatch = useDispatch()
	const {
		register,
		formState:{
			errors
		},
		handleSubmit,
		reset
	} = useForm({
		mode:"onChange"
	})

	const onSubmit = (data) => {
	 reset()
	 dispatch(fetchRegistration(data))
	 dispatch(fetchNewItem(data))
	}

	return (
		<div className='form'>
			<form className='form__content' onSubmit={handleSubmit(onSubmit)}>
				 <input
					type='number'
					placeholder='Номер телефону'
					{...register('number', {
						required: '*Поле обязательно к заполнению!',
						maxLength: {
							value: 12,
							message: 'Должно быть 12 символов',
						},
						minLength: {
							value: 12,
							message: 'Должно быть 12 символов',
						},
					})}
					className='form__input'
				/>
				<p className='form__error'>{errors?.number?.message}</p> 
				 <div className='form__items'>
					<input
						placeholder='Имя пользователя'
						className='form__input'
						type='text'
						{...register('fullName', {
							required: '*Поле обязательно к заполнению!',
							maxLength: {
								value: 25,
								message: 'Должно быть максимум 25 символа',
							},
							minLength: {
								value: 4,
								message: 'Должно быть 4 символа минимум',
							},
						})}
					/>
					<p className='form__error'>{errors?.fullName?.message}</p>
				</div> 
				 <input
					placeholder='Электронная почта'
					className='form__input'
					type='text'
					{...register('email', {
						required: '*Поле обязательно к заполнению!',
						maxLength: {
							value: 20,
							message: 'Должно быть максимум 30 символа',
						},
						minLength: {
							value: 6,
							message: 'Должно быть 6 символов',
						},
					})}
				/> 
				<p className='form__error'>{errors?.email?.message}</p>
				<div className='form__items'>
					<input
						placeholder='Придумайте пароль'
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
						<span>Зарегистрироваться</span>
					</button>
					<button type='reset' className='form__btn'>
						<span>Отменить</span>
					</button>
				</div>
			</form>
		</div>
	)
};

export default Registration ;
