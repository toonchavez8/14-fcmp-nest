import { IsString, IsOptional, IsArray, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePlaylistDto {
	@IsOptional()
	@IsString()
	readonly name?: string; // Name of the playlist, optional for updates

	@IsOptional()
	@IsString()
	readonly description?: string; // Description of the playlist

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	readonly createdAt?: Date; // Optional: Can be updated if needed

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	readonly updatedAt?: Date; // Automatically updated during modifications

	@IsOptional()
	@IsArray()
	@IsInt({ each: true }) // Ensures all IDs are integers
	readonly songs; // Array of song IDs to associate with the playlist

	@IsOptional()
	@IsInt()
	readonly user?: number; // User ID associated with the playlist
}
