import { Module } from '@nestjs/common';
import { CourtInfoService } from './court_info.service.js';
import { CourtInfoController } from './court_info.controller.js';

@Module({
  controllers: [CourtInfoController],
  providers: [CourtInfoService]
})
export class CourtInfoModule {}
