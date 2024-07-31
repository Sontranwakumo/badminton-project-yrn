import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Relation,
} from 'typeorm';
import { User } from './user.entity.js';
import { CourtInfo } from './courtinfo.entity.js';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: Relation<User>;

  @ManyToOne(() => CourtInfo, (court) => court.comments)
  @JoinColumn({ name: 'court_id' })
  court: Relation<CourtInfo>;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  message: string;
}
