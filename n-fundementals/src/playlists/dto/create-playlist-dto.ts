import {
	IsString,
	IsOptional,
	IsArray,
	IsDate,
	IsNumber,
	IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlaylistDto {
	@IsString()
	readonly name: string;

	@IsOptional()
	@IsString()
	readonly description: string;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	readonly createdAt: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	readonly updatedAt: Date;

	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true }) // Ensures each element in the array is a number (IDs of songs)
	readonly songs;

	@IsNumber()
	readonly user: number; // ID of the user who owns the playlist
}
