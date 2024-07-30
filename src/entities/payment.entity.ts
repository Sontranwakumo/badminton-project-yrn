import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentDetail } from './payment_detail.entity.js';
import { PaymentStatus } from '../../src/commons/enums/PaymentStatus.enum.js';

@Entity()
export class Payment extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.payment)
  details: PaymentDetail[];
}
