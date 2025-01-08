import { PlaylistEntity } from '@/playlists/playlists.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	@IsNotEmpty()
	email: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Password is optional
	@Exclude() // Exclude from the response
	password: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Bio is optional
	bio: string;

	@OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
	playlists: PlaylistEntity[];
}
