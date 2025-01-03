import { Module } from '@nestjs/common';
import { SongsController } from '@/songs/songs.controller';
import { SongsService } from '@/songs/songs.service';
import { createConnection } from '@/common/constants/Connection';

@Module({
	// Defines the controllers for this module
	controllers: [SongsController],
	// Defines the providers (services or constants) that will be available in this module
	providers: [
		{
			// Registers the SongsService with the DI system
			provide: SongsService,
			useClass: SongsService, // Specifies that `SongsService` should be instantiated as its own class
		},
		{
			// Registers the 'Connection' constant with the DI system
			provide: 'Connection',
			useValue: createConnection, // Specifies the value to inject wherever 'Connection' is used
		},
	],
})
export class SongsModule {}
