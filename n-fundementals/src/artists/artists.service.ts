import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
	constructor(
		@InjectRepository(ArtistEntity)
		private readonly artistsRepository: Repository<ArtistEntity>,
	) {}

	findArtist(userId: number): Promise<ArtistEntity> {
		return this.artistsRepository.findOne({ where: { id: userId } });
	}
}
