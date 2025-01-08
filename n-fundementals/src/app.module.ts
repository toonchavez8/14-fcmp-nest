import { SongEntity } from '@/songs/song.entity';
import { ConfigModule } from '@nestjs/config';
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { SongsModule } from '@/songs/songs.module';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { DevConfigService } from '@/common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/users.entity';
import { ArtistEntity } from './artists/artists.entity';
import { PlaylistEntity } from './playlists/playlists.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';

// Defining configuration objects for different environments these are used by the factory function however not really used in the application other than for the purpose of demonstration
const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // Makes ConfigModule available globally
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			entities: [UserEntity, ArtistEntity, SongEntity, PlaylistEntity],
			synchronize: true,
		}),
		SongsModule,
		PlaylistsModule,
		AuthModule,
		UserModule,
		UsersModule,
	], // Importing the SongsModule to include its features in the application and the TypeOrmModule to configure the database connection
	controllers: [AppController], // Declaring the main application controller
	providers: [
		AppService, // Registering the AppService as a provider for the application
		{
			provide: DevConfigService, // Defining a custom provider for DevConfigService
			useClass: DevConfigService, // Specifies that the DevConfigService class should be used
		},
		{
			provide: 'Config', // Defining a provider identified by the token 'Config'
			useFactory: () => {
				// Using a factory function to decide which configuration to use based on the environment
				return process.env.NODE_ENV === 'production' // Checking if the environment is production
					? prodConfig // Use production configuration if the environment is production
					: devConfig; // Use development configuration otherwise
			},
		},
	],
})
export class AppModule implements NestModule {
	constructor(private readonly dataSource: DataSource) {
		console.log('dataSource', dataSource.driver.database);
	}
	/**
	 * Configures middleware for the application.
	 * The LoggerMiddleware is applied to handle requests to the 'songs' route with the POST method.
	 * @param consumer - MiddlewareConsumer to manage middleware application
	 */
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware) // Applying the LoggerMiddleware
			.forRoutes({ path: 'songs', method: RequestMethod.POST }); // Specifies the route and method for the middleware
	}
}
