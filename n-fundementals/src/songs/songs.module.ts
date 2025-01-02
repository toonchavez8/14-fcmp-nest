import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/constants/connection';

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
