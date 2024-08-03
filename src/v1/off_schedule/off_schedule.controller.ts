import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffScheduleService } from './off_schedule.service.js';


@Controller('branches/:branchId/off-schedule')
export class OffScheduleController {
  constructor(private readonly offScheduleController: OffScheduleService) {}

  @Post()
  create(@Body() createdto:any){
    console.log(createdto);
    return this.offScheduleController.create(createdto);
  }

  @Get()
  findAll(@Param('branchId') branchid: string) {
    return `Hello ${branchid}`;
    // return this.offScheduleController.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.offScheduleController.findOne(id);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.offScheduleController.remove(id);
//   }
}
