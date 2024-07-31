import { Module } from '@nestjs/common';
import { OffScheduleService } from './off_schedule.service.js';
import { OffScheduleController } from './off_schedule.controller.js';


@Module({
  controllers: [OffScheduleController],
  providers: [OffScheduleService],
  exports: [OffScheduleService]
})
export class OffScheduleModule {}
