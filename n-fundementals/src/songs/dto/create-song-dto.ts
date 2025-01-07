import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsString,
	IsOptional,
	IsMilitaryTime,
	IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true }) // Ensures each element in the array is a number
	readonly artists;

	@IsString()
	@IsOptional() // Album might not be required
	readonly album: string;

	@Type(() => Date)
	@IsDate()
	readonly releaseDate: Date;

	@IsString()
	@IsOptional() // Genre might not be required
	readonly genre: string;

	@IsNotEmpty()
	@IsMilitaryTime()
	readonly duration: Date; // Assuming duration is in seconds or minutes

	@IsOptional()
	@IsString()
	readonly lyrics: string;
}
