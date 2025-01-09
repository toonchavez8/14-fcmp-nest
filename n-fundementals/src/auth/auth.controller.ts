import { UserEntity } from '@/users/users.entity';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user-dto';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly UsersService: UsersService,
		private readonly AuthService: AuthService,
	) {}
	@Post('signup')
	signup(@Body() userDto: CreateUserDto): Promise<UserEntity> {
		return this.UsersService.create(userDto);
	}
	@Post('login')
	login(@Body() loginDto: LoginDTO): Promise<{ accessToken: string }> {
		return this.AuthService.login(loginDto);
	}
}
