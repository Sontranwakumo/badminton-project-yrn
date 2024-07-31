import { Module } from '@nestjs/common';
import { DefaultPriceService } from './default_price.service';

@Module({
  providers: [DefaultPriceService],
  exports: [DefaultPriceService]
})
export class DefaultPriceModule {}
