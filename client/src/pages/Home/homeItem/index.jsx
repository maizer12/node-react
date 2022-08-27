import React, { useState } from 'react'
import {  useDispatch } from 'react-redux'
import axios from 'axios'
import { setOne } from '../../../redux/slices/postSlice'
import { Navigate } from 'react-router-dom'
const HomeItem = ({ postItem }) => {
	const dispatch = useDispatch()
	const [status, setStatus] = useState(false)
	const fetchOne = a => {
		axios.get('http://localhost:4000/post/' + a).then(res => {
			dispatch(setOne(res.data))
		})
	}
	const userOpen = a => {
		fetchOne(a)
		setStatus(true)
	}
	if (status) {
		return <Navigate to='/user' />
	}
	function time(e){
		const res = Math.max(
			...e.massive.map(e => Number(e.time.replace(/:/gi, '')))
		)
		if(res < 1){
			return '00:0' +res
		}else if (res < 1000) {
			return 0 + String(res).slice(0, 1) + ':' + String(res).slice(1, 3)
		} else {
			return String(res).slice(0, 2) + ':' + String(res).slice(2, 4)
		}
	}
	return (
		<ul>
			{postItem.length >= 2
				? postItem.map(e => (
						<li key={e._id} className='home-users__item'>
							<p onClick={() => userOpen(e._id)} className='home-users__name'>
								{e.name}
							</p>
							<p className='home-users__inform'>{e.mail}</p>
							<p className='home-users__inform'>{e.massive.length}</p>
							<p className='home-users__inform'>{time(e)}</p> 
						</li>
				  ))
				: ''}
		</ul>
	)
}

export default HomeItem
