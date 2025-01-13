import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from '@/auth/jwt-strategry';
import { ArtistsModule } from '@/artists/artists.module';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: authConstants.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
		ArtistsModule,
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
