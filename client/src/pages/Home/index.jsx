import React, {useState} from 'react'
import './home.Module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost, setSort } from '../../redux/slices/postSlice'
import HomeItem from './homeItem'
const Home = () => {
	const postItem = useSelector(state => state.posts.postItem)
	const newSort = useSelector(state => state.posts.sortElem)
	const dispatch = useDispatch()
	const sortMassive = [
		'Имя',
		'Маил адрес',
		'Количество событий',
	]
	const [num, setNum] = useState(0)
	React.useEffect(() => {
		dispatch(fetchPost())
	}, [newSort])
	const sortItem = (i) =>{
		if(i === 0){
			dispatch(setSort('name'))
		}else if(i === 1){
			dispatch(setSort('mail'))
		}else if(i === 2){
			dispatch(setSort('massive'))
		}
		setNum(i)
	}
	return (
		<main className='home'>
			<ul className='home-users'>
				<li>
					<ul className='home-sort'>
						{sortMassive.map((e, i) => (
							<li
								onClick={() => sortItem(i)}
								key={e}
								className={`home-sort__item 
							${num === i ? 'home-sort__item-active' : ''}`}
							>
								{e}
								<img width={17} src='./img/arrow.svg' alt='arrow' />
							</li>
						))}
						<li className='home-sort__item'>Время следующего события</li>
					</ul>
				</li>
				<li>
					<HomeItem postItem={postItem} />
				</li>
			</ul>
		</main>
	)
}

export default Home
