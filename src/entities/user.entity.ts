
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderForm } from './order_form.entity.js';
import { UserRole } from '../../src/commons/enums/UserRole.enum.js';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => OrderForm, (order) => order.sender)
  orders: OrderForm[];
}
