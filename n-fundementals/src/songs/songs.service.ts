import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
	//Local db and array of songs
	private readonly songs = [];

	create(song) {
		//Create a new song
		this.songs.push(song);
		return this.songs;
	}

	findAll() {
		//Find all songs
		return this.songs;
	}
}
