import { UserEntity } from '@/users/users.entity';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly UsersService: UsersService) {}
	@Post('signup')
	signup(@Body() userDto: CreateUserDto): Promise<UserEntity> {
		return this.UsersService.create(userDto);
	}
}
