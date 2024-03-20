import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({ user: userId });

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await tokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(token) {
		const tokenData = await tokenModel.deleteOne({ refreshToken: token });
		return tokenData;
	}

	async findToken(token) {
		const tokenData = await tokenModel.findOne({ refreshToken: token });
		return tokenData;
	}

	async validationAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (err) {
			return null;
		}
	}

	async validationRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (err) {
			return null;
		}
	}
}

export default new TokenService();
