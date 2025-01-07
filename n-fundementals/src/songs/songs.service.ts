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

@Injectable()
export class SongsService {
	constructor(
		// Injecting the Song repository to use its methods for database operations without it the serivece will break and throw an error
		@InjectRepository(SongEntity)
		private readonly songsRepository: Repository<SongEntity>,
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
		Object.assign(song, songDto);
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
