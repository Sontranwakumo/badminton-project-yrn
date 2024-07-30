import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from './user.entity.js';
import { CourtInfo } from './courtinfo.entity.js';
import { Payment } from './payment.entity.js';
import { TimeSlot } from './timeslot.entity.js';
import { BookStatus } from '../../src/commons/enums/BookStatus.enum.js';

@Entity()
export class OrderForm extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'sender_id' })
  sender: Relation<User>;

  @Column()
  court_id: string;

  @ManyToOne(() => CourtInfo)
  @JoinColumn({name:'court_id'})
  court: Relation<CourtInfo>;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.PENDING,
  })
  book_status: BookStatus;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  note: string;

  @OneToOne(() => Payment, { cascade: true })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @OneToMany(() => TimeSlot, (time) => time.order)
  timeslots: TimeSlot[];
}
