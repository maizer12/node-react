import UserModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';

class UserService {
	async registration(email, password) {
		const doc = await UserModel.findOne({ email });
		if (doc) {
			throw 'Email is busy!';
		}
		const passwordHash = await bcrypt.hash(password, 4);
		const activationLink = v4();
		await mailService.sendActivationMail(email, `${process.env.API_URL} ${activationLink}`);
		const user = await UserModel.create({ email, password: passwordHash, activationLink });
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: UserDto,
		};
	}
}

export default new UserService();
