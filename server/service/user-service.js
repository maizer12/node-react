import UserModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
	async registration(email, password) {
		const doc = await UserModel.findOne({ email });
		if (doc) {
			throw ApiError.BadRequest('Email is busy!');
		}
		const passwordHash = await bcrypt.hash(password, 4);
		const activationLink = v4();
		const link = `${process.env.API_URL}/api/activate/${activationLink}`;
		await mailService.sendActivationMail(email, link);
		const user = await UserModel.create({ email, password: passwordHash, activationLink });
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest('User is not find!');
		}

		const checkPassword = await bcrypt.compare(password, user.password);

		if (!checkPassword) {
			throw ApiError.BadRequest('Password is wrong');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest("User don't find!");
		}
		user.isActivated = true;
		await user.save();
	}

	async logout(token) {
		const result = await tokenService.removeToken(token);
		return result;
	}
}

export default new UserService();
