import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from '@/auth/dto/login-dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async create(userDto: CreateUserDto): Promise<UserEntity> {
		const user = new UserEntity();

		const salt = await bcrypt.genSalt();

		user.username = userDto.username;
		user.password = await bcrypt.hash(userDto.password, salt);
		user.firstName = userDto.firstName;
		user.lastName = userDto.lastName;
		user.email = userDto.email;
		user.bio = userDto.bio;

		const savedUser = await this.usersRepository.save(user);
		delete savedUser.password;
		return savedUser;
	}

	async findOne(data: LoginDTO): Promise<UserEntity> {
		const user = await this.usersRepository.findOne({
			where: { email: data.email },
		});
		if (!user) {
			throw new UnauthorizedException('Could not find user');
		}
		return user;
	}
}
