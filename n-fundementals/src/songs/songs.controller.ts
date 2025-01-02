import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
	@Post()
	create() {
		return 'create a song';
	}
	@Get()
	findAll() {
		return ['song1', 'song2', 'song3'];
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
