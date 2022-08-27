import { useMemo, useState} from 'react'
import './user.Module.scss'
import Popup from '../../compont/popup'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
const User = () => {
	const oneItem = useSelector(state => state.posts.oneItem)
	const [popup, setPopup] = useState(false)
	const [itemReal, setItemReal] = useState()
	useMemo(() => {
		setItemReal(oneItem.massive)
	}, [oneItem.massive])
	return (
		<>
			{!Array.isArray(itemReal) ? (
				<main className='user-profile'>
					<h2 className='user-profile__title'>
						Вернитесь назад и обирите другого пользователя
					</h2>
					<h4 className='user-profile__name'>Имя: не найден</h4>
					<p className='user-profile__mail'>Маил: не найден</p>
					<Link
						to='/home'
						style={{ display: 'block', maxWidth: 220 }}
						className='user-profile__btn'
					>
						Вернутся на главную
					</Link>
					<Popup setPopup={setPopup} popup={popup} />
				</main>
			) : (
				<main className='user-profile'>
					<h2 className='user-profile__title'>События пользователя:</h2>
					<h4 className='user-profile__name'>Имя: {oneItem.name}</h4>
					<p className='user-profile__mail'>Маил: {oneItem.mail}</p>
					<button
						onClick={() => setPopup(!popup)}
						className='user-profile__btn'
					>
						Создать события
					</button>
					<Link
						to='/home'
						style={{ display: 'block', maxWidth: 220 }}
						className='user-profile__btn'
					>
						Вернутся на главную
					</Link>
					<ul className='user-profile__list'>
						{itemReal.map((e, i) => (
							<li key={i} className='user-profile__item'>
								<p className='user-profile__desc'>
									{i}. {e.task}
								</p>
								<p className='user-profile__date'>{e.time}</p>
							</li>
						))}
					</ul>
					<Popup
						itemReal={itemReal}
						setItemReal={setItemReal}
						oneItem={oneItem}
						setPopup={setPopup}
						popup={popup}
					/>
				</main>
			)}
		</>
	)
}

export default User
