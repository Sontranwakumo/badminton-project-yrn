import { Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto.js';
import { CourtInfo } from '../../../src/entities/courtinfo.entity.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { Branch } from '../../../src/entities/branch.entity.js';
import { User } from '../../../src/entities/user.entity.js';
@Injectable()
export class BranchesService {
  constructor() {}

  async create(branch_dto:CreateBranchDto){
    // const user = new User();
    // user.username = 'Josh';
    // user.email = 'orz@gmail.com';
    // user.password = 'dhruv';
    // user.fullname = 'noname';
    // user.phone = '01212124134';
    // await user.save();
    console.log("create: ");
    console.log(branch_dto);
    const user = await User.findOneBy({id:branch_dto.owner_id});
    const branch = new Branch();
    branch.owner = user;
    branch.address = branch_dto.address;
    await branch.save();
    return JSON.stringify(branch);
  }

 async createCourt(id: string, createCourtDto: CreateCourtDto) {
    console.log("createCourt:");
    console.log(createCourtDto);
    const court = await CourtInfo.create({
      ...createCourtDto,
      id_branch:id,
      comments: [],
    }).save();
    console.log(court);
    await CourtInfo.createQueryBuilder().insert()
    return JSON.stringify(court);
  }

  findAll() {
    return `This action returns all branches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
