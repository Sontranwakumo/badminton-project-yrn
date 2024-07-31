import { Module } from '@nestjs/common';
import { OpenScheduleService } from './open_schedule.service';

@Module({
  providers: [OpenScheduleService],
  exports: [OpenScheduleService]
})
export class OpenScheduleModule {}
