import { Injectable } from '@nestjs/common';
import { CreateOffScheduleDto } from './dto/create-off-schedule.dto';
import { Branch, OffSchedules } from '../../entities';
import { MoreThan } from 'typeorm';
@Injectable()
export class OffScheduleService {
  async create(createOffScheduleDto: CreateOffScheduleDto) {

    const branchEntity = await Branch.findOneBy({ id: createOffScheduleDto.branch_id });
    if (!branchEntity) {
      throw new Error('Branch not found');
      // will update type of error later
    }
    const offSchedule = OffSchedules.create({
      ...createOffScheduleDto,
      branch:branchEntity
    })

    return await offSchedule.save();
  }

  async findAllWithBranch(branch_id: string) {
    return await OffSchedules.find({
      where: { branch: { id: branch_id } },
      relations: ['branch'],
    });
  }

  async findAllInFutureWithBranch(branch_id: string) {
    const now = new Date();
    return await OffSchedules.find({
      where: {
        branch: { id: branch_id },
        start_date: MoreThan(now),
      },
      relations: ['branch'],
    });
  }

  async findOne(id: number) {
    return await OffSchedules.findOneBy({ id });
  }

  async findOneBy(branch_id: string) {
    return await OffSchedules.findOne({
      where: { branch: { id: branch_id } },
      relations: ['branch'],
    });
  }

  async update(id: number, updateOffScheduleDto: Partial<CreateOffScheduleDto>) {
    const offSchedule = await this.findOne(id);
    if (!offSchedule) {
      throw new Error('OffSchedule not found');
    }

    Object.assign(offSchedule, updateOffScheduleDto);
    if (updateOffScheduleDto.branch_id) {
      const branchEntity = await Branch.findOneBy({ id: updateOffScheduleDto.branch_id });
      if (branchEntity) {
        offSchedule.branch = branchEntity;
      }
    }

    return await offSchedule.save();
  }

  async remove(id: number) {
    const offSchedule = await this.findOne(id);
    if (!offSchedule) {
      throw new Error('OffSchedule not found');
    }
    return await offSchedule.remove();
  }
}
