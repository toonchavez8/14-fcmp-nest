import { CreatePlaylistDto } from './dto/create-playlist-dto';
import { PlaylistEntity } from './playlists.entity';
import { PlaylistsService } from './playlists.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('playlists')
export class PlaylistsController {
	constructor(private readonly playlistsService: PlaylistsService) {}

	// Create a new playlist
	@Post()
	create(
		@Body()
		playlistDto: CreatePlaylistDto,
	): Promise<PlaylistEntity> {
		return this.playlistsService.create(playlistDto);
	}
}
