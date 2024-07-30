import { Injectable } from '@nestjs/common';
import { CreateOrderFormDto } from './dto/create-order-form.dto.js';
import { UpdateOrderFormDto } from './dto/update-order-form.dto.js';
import { OrderForm } from '../../entities/orderform.entity.js';
import { User } from '../../entities/user.entity.js';
import { CourtInfo } from '../../entities/courtinfo.entity.js';
import { assert, time, timeStamp } from 'console';
import { BookStatus } from '../../commons/enums/BookStatus.enum.js';
import { TimeSlot } from '../../entities/timeslot.entity.js';

@Injectable()
export class OrderFormsService {
  async create(createOrderFormDto: CreateOrderFormDto) {
    // check valid time
    {
      // check valid open schedule
        
      // check valid off schedule

      // check valid time slot from defaultprices

      // check time slot from existed time slot

    }
    const order = new OrderForm();
    const sender = await User.findOneBy({id:createOrderFormDto.sender_id});
    order.sender = sender;
    const court = await CourtInfo.findOneBy({id:createOrderFormDto.court_id});
    order.court = court;
    order.book_status = BookStatus.PENDING;
    order.note = createOrderFormDto.note;
    const timeslot = new TimeSlot();
    timeslot.court = court;
    timeslot.start_time = createOrderFormDto.start_time;
    timeslot.end_time = createOrderFormDto.end_time;
    timeslot.match_date = createOrderFormDto.booking_date;
    timeslot.order = order;
    order.timeslots = [timeslot];
    order.save();
    console.log(order)
    return order;
  }

  findAll() {
    return `This action returns all orderForms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderForm`;
  }

  update(id: number, updateOrderFormDto: UpdateOrderFormDto) {
    return `This action updates a #${id} orderForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderForm`;
  }
}
