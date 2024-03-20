import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/main.css';
import Store from './store/store.ts';

const store = new Store();

interface IStore {
	store: Store;
}

export const Context = createContext<IStore>({
	store,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Context.Provider value={{ store }}>
		<App />
	</Context.Provider>
);
