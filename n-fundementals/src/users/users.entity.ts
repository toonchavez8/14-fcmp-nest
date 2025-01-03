// import { Song } from '@/songs/entities/song.entity';
// import { User } from '@/users/entities/user.entity';
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {}
