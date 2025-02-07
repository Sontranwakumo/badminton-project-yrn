import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Relation,
} from 'typeorm';
import { CourtInfo } from './court_info.entity.js';
import { OrderForm } from './order_form.entity.js';

@Entity()
export class TimeSlot extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  court_id: string;

  @ManyToOne(() => CourtInfo)
  @JoinColumn({ name: 'court_id' })
  court: Relation<CourtInfo>;

  @Column('time')
  start_time: string;

  @Column('time')
  end_time: string;

  @Column('date')
  match_date: string;

  @ManyToOne(() => OrderForm, (ord) => ord.timeslots, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Relation<OrderForm>;
}
