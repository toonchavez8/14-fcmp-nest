import { Module } from '@nestjs/common';
import { SongsController } from '@/songs/songs.controller';
import { SongsService } from '@/songs/songs.service';
import { createConnection } from '@/common/constants/Connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from '@/songs/song.entity';
import { ArtistEntity } from '@/artists/artists.entity';

@Module({
	// Defines the import of the entities for this module
	imports: [TypeOrmModule.forFeature([SongEntity, ArtistEntity])],
	// Defines the controllers for this module
	controllers: [SongsController],
	// Defines the providers (services or constants) that will be available in this module
	providers: [
		SongsService,
		{
			// Registers the 'Connection' constant with the DI system
			provide: 'Connection',
			useValue: createConnection, // Specifies the value to inject wherever 'Connection' is used
		},
	],
})
export class SongsModule {}
