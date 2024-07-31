import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPriceService } from './default_price.service.js';

describe('DefaultPriceService', () => {
  let service: DefaultPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultPriceService],
    }).compile();

    service = module.get<DefaultPriceService>(DefaultPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
