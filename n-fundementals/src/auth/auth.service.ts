import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
		const user = await this.usersService.findOne(loginDto);

		const passwordMatched = await bcrypt.compare(
			loginDto.password,
			user.password,
		);
		if (passwordMatched) {
			delete user.password;
			const payload = { email: user.email, sub: user.id };
			const accessToken = this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Invalid username or password');
		}
	}
}
