import { Injectable } from '@nestjs/common';
import { DayOfWeek } from '../../commons/enums/DayOfWeek.enum.js';
import { Branch, OpenSchedule } from '../../entities/index.js';

@Injectable()
export class OpenScheduleService {
  async create(
    startTime: string,
    endTime: string,
    dayOfWeek: DayOfWeek,
    branch: Branch,
  ) {
    const openTime = new OpenSchedule();
    openTime.start_time = startTime;
    openTime.end_time = endTime;
    openTime.branch = branch;
    openTime.day_of_week = dayOfWeek;
    return await openTime.save();
  }

  async createDefaultForBranch(branch: Branch) {
    const defaultSchedules = [
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Monday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Tuesday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Wednesday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Thursday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Friday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Saturday },
      { startTime: '09:00', endTime: '17:00', dayOfWeek: DayOfWeek.Sunday },
    ];

    const openSchedules = defaultSchedules.map((schedule) => {
      const openTime = new OpenSchedule();
      openTime.start_time = schedule.startTime;
      openTime.end_time = schedule.endTime;
      openTime.branch = branch;
      openTime.day_of_week = schedule.dayOfWeek;
      return openTime.save();
    });
    return await Promise.all(openSchedules);
  }

  async getAllWithBranch(branch: Branch | string) {
    if (typeof branch === 'string') {
      return await OpenSchedule.findBy({ branch_id: branch });
    } else {
      return await OpenSchedule.findBy({ branch_id: branch.id });
    }
  }

  async update(
    id: number,
    startTime: string,
    endTime: string,
    dayOfWeek: DayOfWeek,
  ) {
    const openTime = await OpenSchedule.findOneBy({ id: id });
    if (!openTime) {
      throw new Error('OpenSchedule not found');
    }
    openTime.start_time = startTime;
    openTime.end_time = endTime;
    openTime.day_of_week = dayOfWeek;
    return await openTime.save();
  }

  async remove(id: number) {
    const openTime = await OpenSchedule.findOneBy({ id: id });
    if (!openTime) {
      throw new Error('OpenSchedule not found');
    }
    return await openTime.remove();
  }
}
