import { Module } from '@nestjs/common';
import { DefaultPriceService } from './default_price.service.js';
import { DefaultPriceController } from './default_price.controller.js';

@Module({
  controllers: [DefaultPriceController],
  providers: [DefaultPriceService],
  exports: [DefaultPriceService]
})
export class DefaultPriceModule {}
