import { ArtistEntity } from '@/artists/artists.entity';
import { PlaylistEntity } from '@/playlists/playlists.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
} from 'typeorm';

@Entity('songs')
export class SongEntity {
	@PrimaryGeneratedColumn() // Generates a unique identifier for each song
	id: number;

	@Column({ type: 'varchar', length: 255 })
	title: string;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Album is optional
	album: string;

	@Column({ type: 'date' })
	releaseDate: Date;

	@Column({ type: 'varchar', length: 255, nullable: true }) // Genre is optional
	genre: string;

	@Column({ type: 'time', nullable: true }) // 'time' type for durations
	duration: Date;

	@Column({ type: 'text', nullable: true }) // Lyrics are optional and can be stored as text
	lyrics: string;

	@ManyToMany(() => ArtistEntity, (artist) => artist.songs, { cascade: true })
	@JoinTable({ name: 'songs_artists' })
	artists: ArtistEntity[];

	@ManyToOne(() => PlaylistEntity, (playlist) => playlist.songs, {
		cascade: true,
	})
	playlist: PlaylistEntity;
}
