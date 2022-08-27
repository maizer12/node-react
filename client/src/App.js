import Header from './compont/header'
import RegistrationLogin from './compont/registrationLogin'
import Home from './pages/Home'
import User from './pages/User'
import { useSelector } from 'react-redux'
import './style/null.scss'
import { Routes, Route } from 'react-router-dom'

function App() {
	const user = useSelector(state => state.posts.userLogin.user)
	const status = useSelector(state => state.posts.userLogin.status)
	
	return (
		<div className='App'>
			{status ? <Header mail={user.email} /> : ''}
			<Routes>
				<Route path='/' element={<RegistrationLogin />} />
				<Route path='/home' element={<Home />} />
				<Route path='/user' element={<User />} />
			</Routes>
		</div>
	)
}

export default App
