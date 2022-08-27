import React, { useState } from 'react'
import Login from './login'
import Registration from './registration'
import './registrationLogin.Module.scss'
const RegistrationLogin = () => {
	const [click, setClick] = useState(false)
	return (
		<main className='window'>
			<div className='window__popup'>
				<h4 className='window__title'>{click ? 'Вход' : 'Регистрация'}</h4>
				{click ? <Login />: <Registration />}
				<p onClick={() => setClick(!click)} className='window__switch'>
					{click ? 'Регистрация' : 'Войти'}
				</p>
			</div>
		</main>
	)
}

export default RegistrationLogin
