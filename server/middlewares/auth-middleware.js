import ApiError from '../exceptions/api-error.js';
import tokenService from '../service/token-service.js';

export default async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = await tokenService.validationAccessToken(token);

		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}
		req.user = userData;
		next();
	} catch {
		return next(ApiError.UnauthorizedError());
	}
};
