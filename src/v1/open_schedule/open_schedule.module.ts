import { Module } from '@nestjs/common';
import { OpenScheduleService } from './open_schedule.service.js';

@Module({
  providers: [OpenScheduleService],
  exports: [OpenScheduleService]
})
export class OpenScheduleModule {}
