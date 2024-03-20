import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { BASE_URL } from '../http';

export default class Store {
	user = {} as IUser;
	users: IUser[] = [];
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setLoading(bool: boolean) {
		this.isLoading = bool;
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: IUser) {
		this.user = user;
	}

	setUsers(users: IUser[]) {
		this.users = users;
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (err) {
			console.log(err);
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (err) {
			console.log(err);
		}
	}
	async logout() {
		try {
			await AuthService.logout();
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({} as IUser);
		} catch (err) {
			console.log(err);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, { withCredentials: true });
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (err) {
			console.log(err);
		} finally {
			this.setLoading(false);
		}
	}
}
