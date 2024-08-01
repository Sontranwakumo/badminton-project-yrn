import { CourtStatus } from '../commons/enums/CourtStatus.enum.js';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity.js';
import { Comment } from './comment.entity.js';
@Entity()
export class CourtInfo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  id_branch: string; // khoá ngoại

  @ManyToOne(() => Branch, (branch) => branch.courts)
  @JoinColumn({ name: 'id_branch' })
  branch?: Branch;

  @Column({
    type: 'enum',
    enum: CourtStatus,
    default: CourtStatus.ACTIVE,
  })
  status: CourtStatus;

  @OneToMany(() => Comment, (comment) => comment.court)
  comments: Comment[];
}
