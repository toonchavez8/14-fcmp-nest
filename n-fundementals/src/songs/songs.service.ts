import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
	// Local in-memory database: An array to store songs
	private readonly songs = [];

	/**
	 * Create a new song and add it to the local database.
	 * @param song - The song object to add.
	 * @returns The updated list of songs after the new song is added.
	 */
	create(song) {
		// Add the song to the in-memory array
		this.songs.push(song);
		return this.songs; // Return the updated list of songs
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
