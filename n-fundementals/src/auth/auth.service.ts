import { ArtistsService } from './../artists/artists.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login-dto';
import { PayloadType } from './types';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly artistsService: ArtistsService,
	) {}

	async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
		const user = await this.usersService.findOne(loginDto);

		const passwordMatched = await bcrypt.compare(
			loginDto.password,
			user.password,
		);
		if (passwordMatched) {
			delete user.password;
			const payload: PayloadType = { email: user.email, userId: user.id };

			const artist = await this.artistsService.findArtist(user.id);
			if (artist) {
				payload.artistId = artist.id;
			}
			const accessToken = this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Invalid username or password');
		}
	}
}
