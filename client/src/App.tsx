import { useContext, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';

function App() {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth();
		}
	}, []);

	async function getUsers() {
		try {
			const { data } = await UserService.fetchUsers();
			store.setUsers(data);
		} catch (e) {
			console.log(e);
		}
	}

	if (store.isLoading) {
		return <h1>Loading...</h1>;
	}

	if (!store.isAuth) {
		return <LoginForm />;
	}

	return (
		<main>
			<h1>User {store.isAuth ? 'auth' : 'not auth'}</h1>
			<button onClick={store.logout}>Logout</button>
			<button onClick={getUsers}>Get Users</button>
			{!!store.users &&
				store.users.map(e => (
					<div key={e.email}>
						<h4>{e.email}</h4>
					</div>
				))}
		</main>
	);
}

export default observer(App);
