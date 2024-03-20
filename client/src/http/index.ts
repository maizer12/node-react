import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const BASE_URL = 'http://localhost:4000/api/';

const $api = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

$api.interceptors.response.use(
	config => {
		return config;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, { withCredentials: true });
				localStorage.setItem('token', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (err) {
				console.log('here');
			}
		}
		throw error;
	}
);

export default $api;
