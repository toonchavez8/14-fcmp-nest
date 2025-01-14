import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
