import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SongEntity } from '@/songs/song.entity';
import { CreateSongDto } from '@/songs/dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
	constructor(
		// Injecting the Song repository to use its methods for database operations without it the serivece will break and throw an error
		@InjectRepository(SongEntity)
		private readonly songsRepository: Repository<SongEntity>,
	) {}
	// Local in-memory database: An array to store songs
	private readonly songs = [];

	/**
	 * Create a new song and add it to the local database.
	 * @param song - The song object to add.
	 * @returns The updated list of songs after the new song is added.
	 */
	async create(songDto: CreateSongDto): Promise<SongEntity> {
		const song = new SongEntity();
		song.title = songDto.title;
		song.artists = songDto.artists;
		song.album = songDto.album;
		song.releaseDate = songDto.releaseDate;
		song.genre = songDto.genre;
		song.duration = songDto.duration;
		song.lyrics = songDto.lyrics;

		return await this.songsRepository.save(song);
	}

	/**
	 * Retrieve all songs stored in the local database.
	 * @returns The array of all songs.
	 */
	findAll() {
		// Return the current list of songs
		return this.songs;
	}
}
