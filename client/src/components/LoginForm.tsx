import { FC, useContext, useState } from 'react';
import { Context } from '../main';

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { store } = useContext(Context);

	return (
		<div>
			<h1>LoginForm</h1>
			<input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Enter email' />
			<input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Enter password' />
			<button onClick={() => store.login(email, password)}>login</button>
			<button onClick={() => store.registration(email, password)}>registration</button>
		</div>
	);
};

export default LoginForm;
