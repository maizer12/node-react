import React, { useState } from 'react';
import './header.Module.scss'
import { useDispatch } from 'react-redux'
import { setOut } from '../../redux/slices/postSlice'
import { Navigate } from 'react-router-dom'
const Header = ({mail}) => {
	const [close, setClose] = useState(false)
	const dispatch = useDispatch()
	if(close){
		dispatch(setOut())
		return <Navigate to='/' />
	}
	return (
		<header className='header'>
			<div className="header-user">
				<h5 className="header-user__name">Пользователь: {mail}</h5>
				<button onClick={()=> setClose(true)} className="header-user__btn">Выйти</button>
			</div>
		</header>
	);
};

export default Header;