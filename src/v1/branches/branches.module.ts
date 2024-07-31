import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { BranchesController } from './branches.controller.js';
import { Branch } from '../../../src/entities/branch.entity.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { DefaultPrice } from '../../../src/entities/default_price.entity.js';
import { OffSchedules } from '../../entities/off_schedule.entity.js';
import { OpenSchedule } from '../../entities/open_schedule.entity.js';
import { OrderForm } from '../../entities/order_form.entity.js';
import { Payment } from '../../../src/entities/payment.entity.js';
import { PaymentDetail } from '../../entities/payment_detail.entity.js';
import { TimeSlot } from '../../../src/entities/timeslot.entity.js';
import { User } from '../../../src/entities/user.entity.js';
import { Comment } from '../../../src/entities/comment.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Branch,
      CourtInfo,
      User,
      OrderForm,
      DefaultPrice,
      OffSchedules,
      OpenSchedule,
      Payment,
      PaymentDetail,
      Comment,
      TimeSlot,
    ])
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService]
})
export class BranchesModule {}
