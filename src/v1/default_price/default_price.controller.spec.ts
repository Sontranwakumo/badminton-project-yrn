import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DefaultPriceController } from './default_price.controller.js';
import { DefaultPriceService } from './default_price.service.js';
import {
  IMPORT_MODULES,
  clearDB,
  createRandomBranch,
  createRandomOrderDto,
  getRandomUser,
  getSynchronizeConnection,
} from '../../../test/utils/utils.js';
import { DefaultPriceModule } from './default_price.module.js';
import { instanceToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity.js';
import { Branch } from '../../entities/branch.entity.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { INestApplication } from '@nestjs/common';
import { UserRole } from '../../commons/enums/UserRole.enum.js';
import { fa, faker } from '@faker-js/faker';
describe('DefaultPriceController', () => {
  let app: INestApplication;
  let datasource: DataSource;
  beforeAll(async () => {
    datasource = await getSynchronizeConnection();
    const module: TestingModule = await Test.createTestingModule({
      imports: [...IMPORT_MODULES, DefaultPriceModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  let user: User, admin: User, court: CourtInfo, branch: Branch;
  beforeEach(async () => {
    //initialize sender user
    user = await getRandomUser(UserRole.USER);
    //initialize admin
    admin = await getRandomUser(UserRole.ADMIN);
    //initialize branch and court
    const genBranch = await createRandomBranch(admin);
    branch = genBranch.branch;
    court = genBranch.courts[0];
  });
  afterEach(async () => {
    await clearDB(datasource);
  });
  describe('GET /v1/branches/:nameBranch/default-prices', () => {
    /*
      Initialize necessary data to test order.
      Initialize user, admin, court, branch.
    */
    describe('Valid body request', () => {
      it('Should return a list of timeslot and prices', async () => {
        const response = await request(app.getHttpServer())
          .get(`v1/branches/${branch.name}/default-prices`)
        expect(response.status).toEqual(200);
        expect(response.body);
      });
    });
  });
});
