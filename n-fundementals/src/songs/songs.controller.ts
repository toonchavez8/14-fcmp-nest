import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
	constructor(private songsService: SongsService) {}
	@Post()
	create(@Body() CreateSongDto: CreateSongDto) {
		return this.songsService.create(CreateSongDto);
	}
	@Get()
	findAll() {
		try {
			return this.songsService.findAll();
		} catch (error) {
			throw new HttpException(
				"server error, can't find songs",
				HttpStatus.INTERNAL_SERVER_ERROR,
				{ cause: error },
			);
		}
	}
	@Get(':id')
	findOne() {
		return 'get song by id :id';
	}

	@Put(':id')
	updateOne() {
		return 'update song by id :id';
	}
	@Delete(':id')
	deleteOne() {
		return 'delete song by id :id';
	}
}
