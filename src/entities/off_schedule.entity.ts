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
export class OffSchedules extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.offSchedules)
  @JoinColumn({ name: 'branch_id' })
  branch: Relation<Branch>;

  @Column('time', { nullable: true })
  start_time: string;

  @Column('time', { nullable: true })
  end_time: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column({ default: 0 })
  loop_week: number;
}
