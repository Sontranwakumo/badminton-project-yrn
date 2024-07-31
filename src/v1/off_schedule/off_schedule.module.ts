import { Module } from '@nestjs/common';
import { OffScheduleService } from './off_schedule.service';

@Module({
  providers: [OffScheduleService],
  exports: [OffScheduleService]
})
export class OffScheduleModule {}
