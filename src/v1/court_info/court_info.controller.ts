import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourtInfoService } from './court_info.service.js';
import { CreateCourtInfoDto } from './dto/create-court_info.dto.js';
import { UpdateCourtInfoDto } from './dto/update-court_info.dto.js';

@Controller('v1/branches/:branchName/court-infos')
export class CourtInfoController {
  constructor(private readonly courtInfoService: CourtInfoService) {}

  @Post()
  create(
    @Param('branchName') branchName: string,
    @Body() createCourtInfoDto: CreateCourtInfoDto,
  ) {
    return this.courtInfoService.create(branchName, createCourtInfoDto);
  }

  @Get()
  findAll() {
    return this.courtInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtInfoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourtInfoDto: UpdateCourtInfoDto,
  ) {
    return this.courtInfoService.update(id, updateCourtInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courtInfoService.remove(id);
  }
}
