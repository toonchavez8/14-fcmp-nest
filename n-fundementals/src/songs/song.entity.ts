import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class SongEntity {
	@PrimaryGeneratedColumn('uuid') // Generates a unique identifier for each song
	id: string;

	@Column({ type: 'varchar', length: 255 })
	title: string;

	@Column('varchar', { array: true, length: 255 })
	artists: string[];

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
}
