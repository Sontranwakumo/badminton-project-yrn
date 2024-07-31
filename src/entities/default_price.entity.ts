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
export class DefaultPrice extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.defaultPrices)
  @JoinColumn({ name: 'branch_id' })
  branch: Relation<Branch>;

  @Column('time')
  start_time: string;

  @Column('time')
  end_time: string;

  @Column()
  price: number;
}
