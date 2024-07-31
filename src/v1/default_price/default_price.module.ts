import { Module } from '@nestjs/common';
import { DefaultPriceService } from './default_price.service.js';

@Module({
  providers: [DefaultPriceService],
  exports: [DefaultPriceService]
})
export class DefaultPriceModule {}
