import { Injectable } from '@nestjs/common';
import { Branch } from '../../entities/branch.entity.js';
import { DefaultPrice } from '../../entities/default_price.entity.js';
import { InvalidBranchException } from '../../commons/exceptions/InvalidBranch.exception.js';
import { InvalidDefaultPriceException } from '../../commons/exceptions/InvalidDefaultPrice.exception.js';
import { updateDefaultPriceDto } from './dto/update-default-price.dto.js';

@Injectable()
export class DefaultPriceService {
  private idBranch: string;

  async setIdBranch(idBranch: string){
    this.idBranch = idBranch;
  }
  /**
   * Create default prices must be call only once when branch create.
   */
  async createAllWithBranch() {
    const branchEntity = await Branch.findOneBy({ id: this.idBranch });
    if (!branchEntity) {
      throw new InvalidBranchException('Branch not found');
    }

    const checkExist = await DefaultPrice.createQueryBuilder('defaultPrice')
      .where("defaultPrice.branch_id = :id",{id: this.idBranch})
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

  async findAllWithBranch() {
    const branchEntity = await Branch.findOneBy({ id: this.idBranch });
    if (!branchEntity){
      throw new InvalidBranchException("Branch not found");
    }
    return DefaultPrice.createQueryBuilder('defaultPrice')
      .where('defaultPrice.branch_id = :idBranch',{ idBranch: this.idBranch})
      .getMany();
  }

  async findOne(id: number) {
    const branchEntity = await Branch.findOneBy({ id: this.idBranch });
    if (!branchEntity) {
      throw new InvalidBranchException('Branch not found');
    }

    const defaultPrice = await DefaultPrice.createQueryBuilder('defaultPrice')
      .where('defaultPrice.branch_id = :idBranch', { idBranch: this.idBranch })
      .andWhere('defaultPrice.id = :id', { id })
      .getOne();

    if (!defaultPrice) {
      throw new InvalidDefaultPriceException('DefaultPrice id not found');
    }

    return defaultPrice;
  }
  update(updateDefaultPriceDto: updateDefaultPriceDto) {
    //
  }
}
