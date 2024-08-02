import { Injectable } from '@nestjs/common';
import { Branch } from '../../entities/branch.entity.js';
import { DefaultPrice } from '../../entities/default_price.entity.js';
import { InvalidBranchException } from '../../commons/exceptions/InvalidBranch.exception.js';
import { InvalidDefaultPriceException } from '../../commons/exceptions/InvalidDefaultPrice.exception.js';
import { UpdateDefaultPriceDto } from './dto/update-default-price.dto.js';
import { fakerSR_RS_latin } from '@faker-js/faker';
import { InvalidTimeException } from '../../commons/exceptions/InvalidTime.exception.js';

@Injectable()
export class DefaultPriceService {
  /**
   * Create default prices must be call only once when branch create, call by Branch module
   * Each timeslot long 15 minutes. From 0:00 to 24:00.
   */
  async createAllWithBranch(nameBranch) {
    const branchEntity = await Branch.findOneBy({ name: nameBranch });
    if (!branchEntity) {
      throw new InvalidBranchException('Branch not found');
    }

    const checkExist = await DefaultPrice.createQueryBuilder('defaultPrice')
      .where("defaultPrice.branch_id = :id",{id: branchEntity.id})
      .getCount();
    if (checkExist>0){
      throw new InvalidDefaultPriceException('This branch initialized default prices');
    }

    let defaultPrices: DefaultPrice[] = [];
    const startHour = 0;
    const endHour = 24;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const startTime = `${String(hour).padStart(2, '0')}:${String(
          minute,
        ).padStart(2, '0')}`;
        const nextMinute = (minute + 15) % 60;
        const nextHour = hour + Math.floor((minute + 15) / 60);
        const endTime = `${String(nextHour).padStart(2, '0')}:${String(
          nextMinute,
        ).padStart(2, '0')}`;

        const defaultPrice = DefaultPrice.create({
          branch: branchEntity,
          start_time: startTime,
          end_time: endTime,
          price: 10000,
        });

        defaultPrices.push(defaultPrice);
      }
    }

    await DefaultPrice.save(defaultPrices);
    return defaultPrices;
  }

  async findAllWithBranch(nameBranch: string) {
    const branchEntity = await Branch.findOneBy({ name: nameBranch });
    if (!branchEntity){
      throw new InvalidBranchException("Branch not found");
    }
    return await DefaultPrice.createQueryBuilder('defaultPrice')
      .where('defaultPrice.branch_id = :idBranch',{ idBranch: branchEntity.id})
      .getMany();
  }

  async findOne(id: number,nameBranch:string) {
    const branchEntity = await Branch.findOneBy({ name:nameBranch });
    if (!branchEntity) {
      throw new InvalidBranchException('Branch not found');
    }

    const defaultPrice = await DefaultPrice.createQueryBuilder('defaultPrice')
      .where('defaultPrice.branch_id = :idBranch', { idBranch: branchEntity.id })
      .andWhere('defaultPrice.id = :id', { id })
      .getOne();

    if (!defaultPrice) {
      throw new InvalidDefaultPriceException('DefaultPrice id not found');
    }

    return defaultPrice;
  }
  async update(nameBranch: string, updateDefaultPriceDto: UpdateDefaultPriceDto) {
    const {startTime, endTime, pricePerHour} = updateDefaultPriceDto;
    const branchEntity = await Branch.findOneBy({name:nameBranch});

    if (!branchEntity){
      throw new InvalidBranchException("Branch not found");
    }
    if (!this.isValidTime(startTime)||!this.isValidTime(endTime)){
      throw new InvalidTimeException("Invalid input format");
    }
    if (startTime>=endTime){
      throw new InvalidTimeException("Invalid input time range");
    }

    const pricePerSlot = pricePerHour/4;
    const defaultPrices = await DefaultPrice.createQueryBuilder('defaultPrice')
      .where('defaultPrice.branch_id = :idBranch',{idBranch:branchEntity.id})
      .andWhere('defaultPrice.start_time >= :startTime', {startTime})
      .andWhere('defaultPrice.end_time <= :endTime',{endTime})
      .getMany();
    for (let defaultPrice of defaultPrices){
      defaultPrice.price = pricePerSlot;
      await defaultPrice.save();
    }
    return defaultPrices;
  }

  private isValidTime(time: string): boolean {
    try{
      const [hours, minutes] = time.split(':').map(Number);
      if (hours === 24 && minutes === 0) return true;
      if (
        hours < 0 || hours >= 24 ||
        ![0, 15, 30, 45].includes(minutes)
      ) {
        return false;
      }
      return true;
    }
    catch(error){
      return false;
    }
  }
}
