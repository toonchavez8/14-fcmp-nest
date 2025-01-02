import { Module } from '@nestjs/common';
import { SongsController } from '@/songs/songs.controller';
import { SongsService } from '@/songs/songs.service';
import { Connection } from '@/common/constants/Connection';

@Module({
	controllers: [SongsController],
	providers: [
		{
			provide: SongsService,
			useClass: SongsService,
		},
		{
			provide: 'Connection',
			useValue: Connection,
		},
	],
})
export class SongsModule {}
