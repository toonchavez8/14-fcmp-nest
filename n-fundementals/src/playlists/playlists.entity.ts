import { SongEntity } from '@/songs/song.entity';
import { UserEntity } from '@/users/users.entity';
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class PlaylistEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Description is optional
	description: string;

	@Column({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@Column({ type: 'timestamp', nullable: true })
	updatedAt: Date;

	@OneToMany(() => SongEntity, (song) => song.playlist)
	songs: SongEntity[];

	@ManyToOne(() => UserEntity, (user) => user.playlists)
	user: UserEntity;
}
