import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Relation,
} from 'typeorm';
import { Payment } from './payment.entity.js';

@Entity()
export class PaymentDetail extends BaseEntity{
  @PrimaryGeneratedColumn()
  id_detail: number;

  @ManyToOne(() => Payment, (payment) => payment.details)
  @JoinColumn({ name: 'id_payment' })
  payment: Relation<Payment>;

  @Column()
  amount: number;

  @Column()
  payment_method: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  payment_time: Date;

  @Column({ default: false })
  status: boolean;
}
