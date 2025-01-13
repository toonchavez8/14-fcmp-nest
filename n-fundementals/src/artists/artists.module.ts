import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artists.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ArtistEntity])],
	providers: [ArtistsService],
	controllers: [ArtistsController],
	exports: [ArtistsService],
})
export class ArtistsModule {}
