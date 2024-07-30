import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { BranchesController } from './branches.controller.js';
import { Branch } from '../../../src/entities/branch.entity.js';
import { CourtInfo } from '../../../src/entities/courtinfo.entity.js';
import { DefaultPrice } from '../../../src/entities/default_price.entity.js';
import { OffSchedules } from '../../../src/entities/off_schedule.entity.js';
import { OpenSchedule } from '../../../src/entities/open_schedule.entity.js';
import { OrderForm } from '../../../src/entities/orderform.entity.js';
import { Payment } from '../../../src/entities/payment.entity.js';
import { PaymentDetail } from '../../../src/entities/payment_detail.entity.js';
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
