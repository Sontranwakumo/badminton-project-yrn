import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultPriceService {
  create() {
    return 'This action adds a new defaultPrice';
  }

  findAll() {
    return `This action returns all defaultPrice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defaultPrice`;
  }

  update(id: number) {
    return `This action updates a #${id} defaultPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} defaultPrice`;
  }
}
