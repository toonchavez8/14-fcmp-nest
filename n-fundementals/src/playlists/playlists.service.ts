import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from '@/playlists/playlists.entity';
import { SongEntity } from '@/songs/song.entity';
import { UserEntity } from '@/users/users.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
	constructor(
		@InjectRepository(PlaylistEntity)
		private readonly playlistsRepository: Repository<PlaylistEntity>,

		@InjectRepository(SongEntity)
		private readonly songsRepository: Repository<SongEntity>,

		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	async create(playlistDto: CreatePlaylistDto): Promise<PlaylistEntity> {
		const playlist = new PlaylistEntity();

		playlist.name = playlistDto.name;
		playlist.description = playlistDto.description;
		playlist.createdAt = playlistDto.createdAt;
		playlist.updatedAt = playlistDto.updatedAt;
		// Find the user by ID
		playlist.user = await this.usersRepository.findOneBy({
			id: playlistDto.user,
		});

		if (!playlist.user) {
			throw new Error('User not found'); // Handle the case where the user is not found
		}

		// Find songs by their IDs
		const songs = await this.songsRepository.findByIds(playlistDto.songs);

		playlist.songs = songs;
		return await this.playlistsRepository.save(playlist);
	}
}
