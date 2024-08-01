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

@Controller('v1/branches/:idBranch/default-prices')
export class DefaultPriceController {
  constructor(@Param('idBranch') idBranch: string, private readonly  defaulPriceService: DefaultPriceService) {
    defaulPriceService.setIdBranch(idBranch);
  }

  @Get()
  findAllWithBranch(@Param('idBranch') idBranch: string){
    console.log(`Hello ${idBranch}`);
    return this.defaulPriceService.findAllWithBranch();
  }

  @Post()
  async create() {
    // console.log("post order-forms");s
  }

}
