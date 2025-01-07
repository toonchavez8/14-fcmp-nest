import {
	IsArray,
	IsDate,
	IsString,
	IsOptional,
	IsMilitaryTime,
	IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSongDto {
	@IsString()
	@IsOptional()
	readonly title: string;

	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true }) // Ensures each element in the array is a string
	readonly artists;

	@IsString()
	@IsOptional() // Album might not be required
	readonly album: string;

	@Type(() => Date)
	@IsDate()
	@IsOptional()
	readonly releaseDate: Date;

	@IsString()
	@IsOptional() // Genre might not be required
	readonly genre: string;

	@IsOptional()
	@IsMilitaryTime()
	readonly duration: Date; // Assuming duration is in seconds or minutes

	@IsOptional()
	@IsString()
	readonly lyrics: string;
}
