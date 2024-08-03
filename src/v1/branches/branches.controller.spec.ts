import { Test, TestingModule } from '@nestjs/testing';
import { BranchesController } from './branches.controller.js';
import { BranchesService } from './branches.service.js';
import { IMPORT_MODULES, clearDB, getSynchronizeConnection } from '../../../test/utils/utils.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { User } from '../../entities/user.entity.js';
import { BranchesModule } from './branches.module.js';
import { DataSource } from 'typeorm';
import { Branch } from '../../entities/branch.entity.js';

describe('BranchesController', () => {
  let controller: BranchesController;
  let service: BranchesService;
  let connection: DataSource;
  beforeAll(async() =>{
    connection = await getSynchronizeConnection();
  })
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...IMPORT_MODULES, BranchesModule],
    }).compile();
    controller = module.get<BranchesController>(BranchesController);
    service = module.get<BranchesService>(BranchesService);
  });
  afterEach(async ()=>{
    await clearDB(connection);
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  async function generate_owner(){
    const user = new User();
    user.username = 'Josh';
    user.email = 'orz@gmail.com';
    user.password = 'dhruv';
    user.fullname = 'noname';
    user.phone = '01212124134';
    await user.save();
    return user; 
  }
  it('shoulde create a record', async () => {
    // jest.spyOn(service, 'create')
    const user = await generate_owner();
    const createdto: CreateBranchDto = {owner_id:user.id,name: 'ledinhly', address: 'Le Dinh Ly'};
    const result = JSON.parse( await controller.create(createdto));
    expect(result.address).toEqual(createdto.address);
  })
  it('should delete a record', async()=>{
    const user = await generate_owner();
    const branch = new Branch();
    branch.owner = user;
    branch.address = "Mock address";
    await branch.save();
    const id = branch.id;
    expect(((await controller.remove(id)).status)).toBeTruthy();
  })
});
