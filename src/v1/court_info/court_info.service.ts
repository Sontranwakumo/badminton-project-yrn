import { Injectable } from '@nestjs/common';
import { CreateCourtInfoDto } from './dto/create-court_info.dto.js';
import { UpdateCourtInfoDto } from './dto/update-court_info.dto.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { InvalidCourtException } from '../../commons/exceptions/InvalidCourt.exception.js';
import { Branch } from '../../entities/branch.entity.js';
import { InvalidBranchException } from '../../commons/exceptions/InvalidBranch.exception.js';

@Injectable()
export class CourtInfoService {
  async create(branchName: string, createCourtInfoDto: CreateCourtInfoDto) {
    const branch = await Branch.findOneBy({ name: branchName });
    if (!branch) throw new InvalidBranchException('Branch not found');
    createCourtInfoDto.id_branch = branch.id;
    const courtInfo = CourtInfo.create(createCourtInfoDto as any);
    await courtInfo.save().catch((error) => {
      throw new InvalidCourtException('Error creating court info');
    });
    return courtInfo;
  }

  async findAll() {
    return await CourtInfo.find({ relations: ['branch'] });
  }

  async findOne(id: string) {
    const courtInfo = await CourtInfo.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!courtInfo) {
      throw new InvalidCourtException(`CourtInfo with ID ${id} not found`);
    }
    return courtInfo;
  }

  async update(
    id: string,
    updateCourtInfoDto: UpdateCourtInfoDto,
  ): Promise<CourtInfo> {
    const courtInfo = await this.findOne(id);
    Object.assign(courtInfo, updateCourtInfoDto);
    await courtInfo.save();
    return courtInfo;
  }

  async remove(id: string) {
    const courtInfo = await this.findOne(id);
    await courtInfo.remove();
  }
}
