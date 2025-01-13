import { Pagination } from 'nestjs-typeorm-paginate';
import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	ParseFloatPipe,
	ParseIntPipe,
	Post,
	Put,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { SongsService } from '@/songs/songs.service';
import { CreateSongDto } from '@/songs/dto/create-song-dto';
import { Connection } from '@/common/constants/Connection';
import { SongEntity } from './song.entity';
import { DeleteResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { ArtistsJwtGuard } from '@/auth/artists-jwt-garud';

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
	@UseGuards(ArtistsJwtGuard)
	create(@Body() CreateSongDto: CreateSongDto, @Request() request) {
		console.log(request.user);
		return this.songsService.create(CreateSongDto); // Delegate to the service
	}

	/**
	 * Retrieve all songs.
	 * Handles server errors gracefully.
	 */
	@Get()
	findAll(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe)
		limit: number = 10,
	): Promise<Pagination<SongEntity>> {
		limit = limit > 100 ? 100 : limit; // Limits the number of songs returned to 100
		return this.songsService.paginate({
			page,
			limit,
		});
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
