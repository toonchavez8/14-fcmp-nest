import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CONNECTION } from 'src/common/constants/connection';

@Module({
	controllers: [SongsController],
	providers: [
		{
			provide: SongsService,
			useClass: SongsService,
		},
		{
			provide: 'CONNECTION',
			useValue: CONNECTION,
		},
	],
})
export class SongsModule {}
