import { Injectable } from '@nestjs/common';
import { CreateOrderFormDto } from './dto/create-order-form.dto.js';
import { UpdateOrderFormDto } from './dto/update-order-form.dto.js';

@Injectable()
export class OrderFormsService {
  create(createOrderFormDto: CreateOrderFormDto) {
    return 'This action adds a new orderForm';
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
