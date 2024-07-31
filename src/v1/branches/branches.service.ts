import { Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { Branch } from '../../../src/entities/branch.entity.js';
import { User } from '../../../src/entities/user.entity.js';
@Injectable()
export class BranchesService {
  constructor() {}

  async create(branchDto:CreateBranchDto){
    const user = (await User.findOneBy({id:branchDto.owner_id}));
    const branch = new Branch();
    branch.owner = user;
    branch.address = branchDto.address;
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

  async findAll() {
    const branches = await Branch.find();
    return branches;
  }

  async findOne(id: string) {
    const branch = await Branch.findOneBy({id:id.toString()});
    return branch;
  }

  async remove(id: string) {
    try{
      const branch = await Branch.findOneBy({id:id});
      await branch.remove();
      return {status:true};
    }catch(error){
      return {status:false};
      console.log(error);
    }
  }
}
