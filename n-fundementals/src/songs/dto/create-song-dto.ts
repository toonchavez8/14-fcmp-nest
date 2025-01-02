import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsString,
	IsOptional,
	IsMilitaryTime,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true }) // Ensures each element in the array is a string
	readonly artists: string[];

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
}
