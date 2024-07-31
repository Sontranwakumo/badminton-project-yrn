import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchesService } from './branches.service.js';
import { CreateCourtDto } from './dto/create-court.dto.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  create(@Body() createdto:any){
    console.log(createdto);
    return this.branchesService.create(createdto);
  }

  @Post(':id/courts')
  createCourt(@Param('id') id: string, @Body() createCourtDto: CreateCourtDto) {
    return this.branchesService.createCourt(id,createCourtDto);
  }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}
