import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Relation,
} from 'typeorm';
import { Branch } from './branch.entity.js';

@Entity()
export class OpenSchedule extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.openSchedules)
  @JoinColumn({ name: 'branch_id' })
  branch: Relation<Branch>;

  @Column('time', { nullable: true })
  start_time: string;

  @Column('time', { nullable: true })
  end_time: string;
  @Column()
  day_of_week: number;
}
