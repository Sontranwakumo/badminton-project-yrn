import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderFormsService } from './order-forms.service.js';
import { CreateOrderFormDto } from './dto/create-order-form.dto.js';
import { UpdateOrderFormDto } from './dto/update-order-form.dto.js';

@Controller('order-forms')
export class OrderFormsController {
  constructor(private readonly orderFormsService: OrderFormsService) {}

  @Post()
  async create(@Body() createOrderFormDto: CreateOrderFormDto) {
    return this.orderFormsService.create(createOrderFormDto);
  }

  @Get()
  findAll() {
    return this.orderFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderFormsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderFormDto: UpdateOrderFormDto) {
    return this.orderFormsService.update(+id, updateOrderFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderFormsService.remove(+id);
  }
}
