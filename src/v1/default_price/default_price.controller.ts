import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DefaultPriceService } from './default_price.service.js';
import { UpdateDefaultPriceDto } from './dto/update-default-price.dto.js';

@Controller('v1/branches/:nameBranch/default-prices')
export class DefaultPriceController {
  constructor(private readonly defaulPriceService: DefaultPriceService) {}

  @Get()
  findAll(@Param('nameBranch') nameBranch: string) {
    console.log(`Hello ${nameBranch}`);
    return this.defaulPriceService.findAllWithBranch(nameBranch);
  }

  @Patch()
  update(
    @Param('nameBranch') idBranch: string,
    @Body() updateDefaultPriceDto: UpdateDefaultPriceDto,
  ) {
    console.log(updateDefaultPriceDto);
    return this.defaulPriceService.update(idBranch, updateDefaultPriceDto);
  }
}
