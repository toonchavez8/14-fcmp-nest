import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SongEntity } from '@/songs/song.entity';
import { CreateSongDto } from '@/songs/dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import {
	Pagination,
	paginate,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ArtistEntity } from '@/artists/artists.entity';

@Injectable()
export class SongsService {
	constructor(
		// Injecting the Song repository to use its methods for database operations without it the serivece will break and throw an error
		@InjectRepository(SongEntity)
		private readonly songsRepository: Repository<SongEntity>,
		@InjectRepository(ArtistEntity)
		private readonly artistsRepository: Repository<ArtistEntity>,
	) {}

	/**
	 * Create a new song and add it to the local database.
	 * @param song - The song object to add.
	 * @returns The updated list of songs after the new song is added.
	 */
	/**
	 * Create a new song and add it to the local database.
	 */
	async create(songDto: CreateSongDto): Promise<SongEntity> {
		const song = new SongEntity();

		song.title = songDto.title;

		song.album = songDto.album;
		song.releaseDate = songDto.releaseDate;
		song.genre = songDto.genre;
		song.duration = songDto.duration;
		song.lyrics = songDto.lyrics;
		//Find all the artists based on ids

		const artists = await this.artistsRepository.findByIds(songDto.artists);
		song.artists = artists;

		return await this.songsRepository.save(song);
	}

	/**
	 * Retrieve all songs stored in the local database.
	 * @returns The array of all songs.
	 */
	findAll() {
		// Return the current list of songs
		return this.songsRepository.find();
	}

	findOne(id: number): Promise<SongEntity> {
		// Return the song with the specified ID
		return this.songsRepository.findOneBy({ id });
	}

	updateOne(
		id: number,
		recordToUpdate: UpdateSongDto,
	): Promise<UpdateResult> {
		// Update the song with the specified ID
		return this.songsRepository.update({ id }, recordToUpdate);
	}

	deleteOne(id: number): Promise<DeleteResult> {
		// Delete the song with the specified ID
		return this.songsRepository.delete({ id });
	}

	paginate(options: IPaginationOptions): Promise<Pagination<SongEntity>> {
		const queryBuilder = this.songsRepository.createQueryBuilder('song');

		queryBuilder.orderBy('song.releaseDate', 'DESC');

		return paginate<SongEntity>(queryBuilder, options);
	}
}
