import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlists.entity';
import { SongEntity } from '../songs/song.entity';
import { UserEntity } from '@/users/users.entity';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([PlaylistEntity, SongEntity, UserEntity]),
	],
	controllers: [PlaylistsController],
	providers: [PlaylistsService],
})
export class PlaylistsModule {}
