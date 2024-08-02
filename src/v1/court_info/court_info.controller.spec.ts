import { Test, TestingModule } from '@nestjs/testing';
import { CourtInfoController } from './court_info.controller.js';
import { CourtInfoService } from './court_info.service.js';

describe('CourtInfoController', () => {
  let controller: CourtInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtInfoController],
      providers: [CourtInfoService],
    }).compile();

    controller = module.get<CourtInfoController>(CourtInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
