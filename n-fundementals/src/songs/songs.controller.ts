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
	Post,
	Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/Connection';

@Controller('songs') // Defines the base route for this controller
export class SongsController {
	constructor(
		private songsService: SongsService,
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
	) {
		return `fetch song by id ${typeof id}`; // Returning a string for now
	}

	/**
	 * Update a song by its ID.
	 * (Currently returns a placeholder string for testing.)
	 */
	@Put(':id')
	updateOne(@Param('id') id: number) {
		return `update song by id ${id}`;
	}

	/**
	 * Delete a song by its ID.
	 * (Currently returns a placeholder string for testing.)
	 */
	@Delete(':id')
	deleteOne(@Param('id') id: number) {
		return `delete song by id ${id}`;
	}
}
