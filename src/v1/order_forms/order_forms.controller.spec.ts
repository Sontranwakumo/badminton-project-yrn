import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { OrderFormsController } from './order_forms.controller.js';
import { OrderFormsService } from './order_forms.service.js';
import {
  IMPORT_MODULES,
  clearDB,
  createRandomBranch,
  createRandomOrderDto,
  getRandomUser,
  getSynchronizeConnection,
} from '../../../test/utils/utils.js';
import { OrderFormsModule } from './order_forms.module.js';
import { instanceToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity.js';
import { Branch } from '../../entities/branch.entity.js';
import { CourtInfo } from '../../entities/court_info.entity.js';
import { INestApplication } from '@nestjs/common';
import { UserRole } from '../../commons/enums/UserRole.enum.js';
import { fa, faker } from '@faker-js/faker';
describe('OrderFormsController', () => {
  let app: INestApplication;
  let datasource: DataSource;
  beforeAll(async () => {
    datasource = await getSynchronizeConnection();
    const module: TestingModule = await Test.createTestingModule({
      imports: [...IMPORT_MODULES, OrderFormsModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  describe('POST /v1/order-forms', () => {
    let user: User, admin: User, court: CourtInfo, branch: Branch, dto: any;
    /*
      Initialize necessary data to test order.
      Initialize user, admin, court, branch.
    */
    beforeEach(async () => {
      //initialize sender user
      user = await getRandomUser(UserRole.USER);
      //initialize admin
      admin = await getRandomUser(UserRole.ADMIN);
      //initialize branch and court
      const genBranch = await createRandomBranch(admin);
      branch = genBranch.branch;
      court = genBranch.courts[0];
      dto = await createRandomOrderDto(user, court);
    });
    afterEach(async () => {
      await clearDB(datasource);
    });

    describe('Valid body request', () => {
      it('Should return created order forms ', async () => {
        const response = await request(app.getHttpServer())
          .post('/v1/order-forms')
          .send(dto);
        expect(response.status).toEqual(201);
        expect(response.body);
      });
    });
    describe('Invalid', () => {
      describe('Invalid sender id', () => {
        describe('Sender parameter is null', () => {
          it('Should return 400 and an error message for user that does not exist', async () => {
            const fail_dto = {
              ...dto,
              sender_id: null,
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('User can not null');
          });
        });
        describe('Invalid format sender id', () => {
          it('Should return 400 and an error message user ID is not uuid format', async () => {
            const fail_dto = {
              ...dto,
              sender_id: faker.string.fromCharacters('wertyuiodsgasvp', {
                min: 5,
                max: 10,
              }),
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('Invalid userid format');
          });
        });
        describe('Nonexistent user', () => {
          it('Should return 400 and an error message for user that does not exist', async () => {
            const fail_dto = {
              ...dto,
              sender_id: faker.string.uuid(),
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('User not be found');
          });
        });
      });
      describe('Invalid court id', () => {
        describe('Court id parameter is null', () => {
          it('Should return 400 and an error message for court id can not null', async () => {
            const fail_dto = {
              ...dto,
              court_id: null,
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('Court can not null');
          });
        });
        describe('Invalid court id format', () => {
          it('Should return 400 and an error message for court id is invalid format', async () => {
            const fail_dto = {
              ...dto,
              court_id: faker.string.fromCharacters(
                'qwertyuiopsdfghjklzxcvbnm',
                { min: 5, max: 10 },
              ),
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('Invalid courtid format');
          });
        });
        describe('Court id is not exist', () => {
          it('Should return 400 and an error message for court id is not exist', async () => {
            const fail_dto = {
              ...dto,
              court_id: faker.string.uuid(),
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('Court not be found');
          });
        });
      });
      describe('Invalid time slot', () => {
        describe('Not an active date of branch', () => {
          it('Should return 409 and an error message not valid date', async () => {
            const fail_dto = {
              ...dto,
            };
            const response = await request(app.getHttpServer())
              .post('/v1/order-forms')
              .send(fail_dto);
            expect(response.status).toEqual(400);
            expect(response.body.message).toEqual('Court not be found');
          });
        });
        describe('Invalid start time', () => {
          it('Should return 406 and an error message not valid start time', () => {});
        });
        describe('Invalid end time', () => {
          it('Should return 406 and an error message not valid end time', () => {});
        });
        describe('Invalid time range', () => {
          it('Should return 406 and an error message not valid time range', () => {});
        });
      });
    });
  });
});
