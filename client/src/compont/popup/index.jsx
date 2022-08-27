import React, { useState } from 'react'
import './popup.Module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Popup = ({ popup, setPopup, setItemReal, itemReal }) => {
	const fetchOne = async (a, b) => {
		await axios.patch('http://localhost:4000/post/' + a, b)
	}
	const oneItem = useSelector(state => state.posts.oneItem)

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onChange',
	})
	const onSubmit = data => {
		const dataTask = data.maxHouse + ':' + data.maxMin
		const check = itemReal.filter(e => e.time === dataTask).length
		if (!check >= 1) {
			const result = { task: data.task, time: dataTask }
			fetchOne(oneItem._id, { massive: itemReal.concat([result]) })
			reset()
			setPopup(!popup)
			setItemReal(itemReal.concat([result]))
		} else {
			alert('В данного пользователя это время занято!')
		}
	}
	console.log(itemReal)
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={`popup ${popup ? 'popup-active' : ''}`}
		>
			<h6 className='popup__title'>Добавить задание</h6>
			<div className='popup__inputs'>
				<input
					type='text'
					placeholder='Ведите название задачи'
					className='popup__input'
					{...register('task', {
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
				<p className='form__error'>{errors?.task?.message}</p>
				<input
					type='number'
					style={{ maxWidth: 70 }}
					placeholder='Час'
					className='popup__input'
					{...register('maxHouse', {
						required: '*Поле обязательно к заполнению!',
						max: {
							value: 24,
							message: 'Должно быть максимум 24 години',
						},
					})}
				/>
				<p className='form__error'>{errors?.maxHouse?.message}</p>
				<input
					type='text'
					style={{ maxWidth: 70 }}
					placeholder='Мин'
					className='popup__input'
					{...register('maxMin', {
						required: '*Поле обязательно к заполнению!',
						max: {
							value: 60,
							message: 'Должно быть максимум 60 минут',
						},
					})}
				/>
				<p className='form__error'>{errors?.maxMin?.message}</p>
			</div>
			<div className='popup__buttons'>
				<button className='popup__btn'>Отправить</button>
				<button
					type='reset'
					onClick={() => setPopup(!popup)}
					className='popup__btn'
				>
					Отменить
				</button>
			</div>
		</form>
	)
}

export default Popup
