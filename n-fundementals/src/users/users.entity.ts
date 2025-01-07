import { PlaylistEntity } from '@/playlists/playlists.entity';
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

	@Column()
	email: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Password is optional
	password: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Bio is optional
	bio: string;

	@OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
	playlists: PlaylistEntity[];
}
