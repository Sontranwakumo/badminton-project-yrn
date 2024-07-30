import { Test, TestingModule } from '@nestjs/testing';
import { BranchesService } from './branches.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from 'src/entities/branch.entity';
import { Comment } from 'src/entities/comment.entity';
import { CourtInfo } from 'src/entities/courtinfo.entity';
import { DefaultPrice } from 'src/entities/default_price.entity';
import { OffSchedules } from 'src/entities/off_schedule.entity';
import { OpenSchedule } from 'src/entities/open_schedule.entity';
import { OrderForm } from 'src/entities/orderform.entity';
import { Payment } from 'src/entities/payment.entity';
import { PaymentDetail } from 'src/entities/payment_detail.entity';
import { TimeSlot } from 'src/entities/timeslot.entity';
import { User } from 'src/entities/user.entity';

describe('BranchesService', () => {
  let service: BranchesService;

  beforeEach(async () => {
    let service: BranchesService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchesService],
    }).compile();

    service = module.get<BranchesService>(BranchesService);
  });

  it('should be defined', () => {
    console.log('hello');
  });
});
