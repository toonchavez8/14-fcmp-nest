import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	ParseFloatPipe,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import { SongsService } from '@/songs/songs.service';
import { CreateSongDto } from '@/songs/dto/create-song-dto';
import { Connection } from '@/common/constants/Connection';
import { SongEntity } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

@Controller('songs') // Defines the base route for this controller
export class SongsController {
	constructor(
		private readonly songsService: SongsService,
		@Inject('Connection') private readonly Connection: Connection,
	) {
		console.log(this.Connection);
	}

	/**
	 * Create a new song.
	 * @param CreateSongDto - The song data to be created.
	 */
	@Post()
	create(@Body() CreateSongDto: CreateSongDto) {
		return this.songsService.create(CreateSongDto); // Delegate to the service
	}

	/**
	 * Retrieve all songs.
	 * Handles server errors gracefully.
	 */
	@Get()
	findAll() {
		try {
			return this.songsService.findAll(); // Delegate to the service
		} catch (error) {
			// Throwing an exception if fetching songs fails
			throw new HttpException(
				"server error, can't find songs",
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ cause: error },
			);
		}
	}

	/**
	 * Retrieve a song by its ID.
	 * @param id - The ID of the song (validated as a float).
	 */
	@Get(':id')
	findOne(
		@Param(
			'id',
			new ParseFloatPipe({
				errorHttpStatusCode: HttpStatus.BAD_REQUEST, // Return 400 for invalid ID format
			}),
		)
		id: number,
	): Promise<SongEntity> {
		return this.songsService.findOne(id); // Delegate to the service
	}

	/**
	 * Update a song by its ID.
	 * (Currently returns a placeholder string for testing.)
	 */
	@Put(':id')
	updateOne(
		@Param('id', ParseIntPipe) id: number,
		@Body() UpdateSongDto: UpdateSongDto,
	) {
		return this.songsService.updateOne(id, UpdateSongDto); // Delegate to the service
	}

	/**
	 * Delete a song by its ID.
	 * (Currently returns a placeholder string for testing.)
	 */
	@Delete(':id')
	deleteOne(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
		return this.songsService.deleteOne(id); // Delegate to the service
	}
}
