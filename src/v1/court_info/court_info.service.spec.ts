import { Test, TestingModule } from '@nestjs/testing';
import { CourtInfoService } from './court_info.service.js';

describe('CourtInfoService', () => {
  let service: CourtInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourtInfoService],
    }).compile();

    service = module.get<CourtInfoService>(CourtInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
