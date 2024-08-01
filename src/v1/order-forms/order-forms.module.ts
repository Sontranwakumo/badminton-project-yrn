import { Module } from '@nestjs/common';
import { OrderFormsService } from './order-forms.service.js';
import { OrderFormsController } from './order-forms.controller.js';

@Module({
  controllers: [OrderFormsController],
  providers: [OrderFormsService]
})
export class OrderFormsModule {}
