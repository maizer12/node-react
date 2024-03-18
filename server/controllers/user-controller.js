import userService from '../service/user-service.js';

class UserController {
	async registration(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.registration(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (err) {
			return res.status(404).json({ message: err });
		}
	}
	async login(req, res, next) {
		try {
		} catch (e) {}
	}
	async logout(req, res, next) {
		try {
		} catch (e) {}
	}
	async activate(req, res, next) {
		try {
		} catch (e) {}
	}
	async refresh(req, res, next) {
		try {
		} catch (e) {}
	}
	async getUsers(req, res, next) {
		try {
			res.json({
				message: 'is work',
			});
		} catch (e) {}
	}
}

export default new UserController();
