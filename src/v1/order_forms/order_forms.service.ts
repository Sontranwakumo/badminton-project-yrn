import { Injectable } from '@nestjs/common';
import { CreateOrderFormDto } from './dto/create-order-form.dto.js';
import { UpdateOrderFormDto } from './dto/update-order-form.dto.js';
import { OrderForm } from '../../entities/order_form.entity.js';
import { User } from '../../entities/user.entity.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { BookStatus } from '../../commons/enums/BookStatus.enum.js';
import { TimeSlot } from '../../entities/timeslot.entity.js';
import { InvalidUserException } from '../../commons/exceptions/InvalidUser.exception.js';
import { InvalidCourtException } from '../../commons/exceptions/InvalidCourt.exception.js';
import { error } from 'console';

@Injectable()
export class OrderFormsService {
  async create(createOrderFormDto: CreateOrderFormDto) {
    // check valid time
    {
      // check valid open schedule
      // check valid off schedule
      // check valid time slot from defaultprices
      // check time slot from existed time slot of the courtId
    }
    // Create new form
    const order = new OrderForm();
    if (!createOrderFormDto.sender_id) {
      throw new InvalidUserException('User can not null');
    }
    if (!createOrderFormDto.court_id) {
      throw new InvalidCourtException('Court can not null');
    }
    const sender = await User.findOneBy({
      id: createOrderFormDto.sender_id,
    }).catch((error) => {
      throw new InvalidUserException('Invalid userid format');
    });
    if (!sender) {
      throw new InvalidUserException('User not be found');
    }
    order.sender = sender;
    const court = await CourtInfo.findOneBy({
      id: createOrderFormDto.court_id,
    }).catch((error) => {
      throw new InvalidCourtException('Invalid courtid format');
    })
    if (!court) {
      throw new InvalidCourtException('Court not be found');
    }
    order.court = court;
    order.book_status = BookStatus.PENDING;
    order.note = createOrderFormDto.note;
    const timeslot = new TimeSlot();
    timeslot.start_time = createOrderFormDto.start_time;
    timeslot.end_time = createOrderFormDto.end_time;
    timeslot.match_date = createOrderFormDto.booking_date;
    timeslot.court_id = court.id;
    await timeslot.save();
    order.timeslots = [timeslot];
    order.save();
    // console.log(order)
    return order;
  }

  async findAll() {
    //return all orderForms
    const orderforms = await OrderForm.find();

    return orderforms;
  }

  async findOne(id: number) {
    const orderforms = await OrderForm.findOneBy({ id: id });
    return orderforms;
  }

  update(id: number, updateOrderFormDto: UpdateOrderFormDto) {
    return `This action updates a #${id} orderForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderForm`;
  }
}
