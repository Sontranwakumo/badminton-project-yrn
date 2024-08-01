import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('v1/order-forms')
export class DefaultPriceController {
  constructor(private readonly orderFormsService: DefaultPriceController) {}

  @Post()
  async create() {
    // console.log("post order-forms");s
    return this.orderFormsService.create(createOrderFormDto);
  }

}
