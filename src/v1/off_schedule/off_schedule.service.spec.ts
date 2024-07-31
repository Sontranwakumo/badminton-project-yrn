import { Test, TestingModule } from '@nestjs/testing';
import { OffScheduleService } from './off_schedule.service';

describe('OffScheduleService', () => {
  let service: OffScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffScheduleService],
    }).compile();

    service = module.get<OffScheduleService>(OffScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
