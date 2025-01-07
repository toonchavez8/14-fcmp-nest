import { UserEntity } from '@/users/users.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => UserEntity)
	@JoinColumn()
	user: UserEntity;
}
