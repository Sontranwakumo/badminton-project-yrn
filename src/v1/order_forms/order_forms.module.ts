import { Module } from '@nestjs/common';
import { OrderFormsService } from './order_forms.service.js';
import { OrderFormsController } from './order_forms.controller.js';

@Module({
  controllers: [OrderFormsController],
  providers: [OrderFormsService]
})
export class OrderFormsModule {}
