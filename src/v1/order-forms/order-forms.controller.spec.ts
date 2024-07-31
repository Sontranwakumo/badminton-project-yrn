import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { OrderFormsController } from './order-forms.controller.js';
import { OrderFormsService } from './order-forms.service.js';
import {
  IMPORT_MODULES,
  clearDB,
  getSynchronizeConnection,
} from '../../../test/utils/utils.js';
import { OrderFormsModule } from './order-forms.module.js';
import { instanceToInstance } from 'class-transformer';
import { Brackets, DataSource } from 'typeorm';
import { User } from '../../entities/user.entity.js';
import { Branch } from '../../entities/branch.entity.js';
import { CourtInfo } from '../../entities/courtinfo.entity.js';
import { INestApplication } from '@nestjs/common';
import { UserRole } from '../../commons/enums/UserRole.enum.js';
import { TimeSlot } from '../../entities/timeslot.entity.js';

describe('OrderFormsController', () => {
  let app: INestApplication;
  let datasource: DataSource;
  let catsService = { findAll: () => ['test'] };
  beforeAll(async () => {
    datasource = await getSynchronizeConnection();
    const module: TestingModule = await Test.createTestingModule({
      imports: [...IMPORT_MODULES, OrderFormsModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    // await clearDB(datasource);
  });
  describe('POST order-forms', () => {
    let user: User, admin: User, court: CourtInfo, branch: Branch;
    /*
      Initialize necessary data to test order.
      Initialize user, admin, court, branch.
    */
    beforeEach(async () => {
      //initialize sender user
      user = new User();
      user.username = 'Josh';
      user.email = 'orz@gmail.com';
      user.password = 'dhruv';
      user.fullname = 'Josh Johan';
      user.phone = '0121224134';
      await user.save();
      console.log(user);
      //initialize admin
      admin = new User();
      admin.username = 'admin';
      admin.email = 'admin@badminton.com';
      admin.password = 'dhruv';
      admin.fullname = 'Son tran viet';
      admin.role = UserRole.ADMIN;
      admin.phone = '0796688018';
      await admin.save();
      //initialize branch
      branch = new Branch();
      branch.owner = admin;
      branch.address = 'Le Dinh Ly, Da Nang';
      await branch.save();
      //initialize court
      court = new CourtInfo();
      court.branch = branch;
      court.id_branch = branch.id;
      court.description = 'Sân trong nhà, gần khán đài';
      court.name_of_court = 'San 1';
      await court.save();
    });

    describe.only('Valid body request', () => {
      it('Should return created order forms ', async () => {
        const dto = {
          sender_id: user.id,
          court_id: court.id,
          note: 'Please confirm the booking as soon as possible.',
          booking_date: '01-08-2024',
          start_time: '13:00',
          end_time: '17:00',
        };
        const response = await request(app.getHttpServer())
        .post('/order-forms')
        .send(dto)
        expect(response.status).toEqual(201);
        expect(response.body)
      });
    });
    describe('Invalid', () => {
      describe('Invalid sender id', () => {
        describe('Sender parameter is null', () => {
          it('Should return 404 and an error message for user that does not exist', async () => {
            // const wdto = instanceToInstance(dto);
            // wdto.sender_id = null;
            // try {
            //   await controller.create(wdto);
            // } catch (error) {
            //   expect(error.status).toBe(404);
            //   expect(error.message).toBe('');
            // }
          });
        });
        describe('Invalid format sender id', () => {
          it('Should return 400 and an error message user ID is not uuid format', () => {});
        });
        describe('Nonexistent user', () => {
          it('Should return 404 and an error message for user that does not exist', () => {});
        });
      });
      describe('Invalid court id', () => {
        describe('Court id parameter is null or not exist', () => {
          it('Should return 404 and an error message for court id does not exist', () => {});
        });
        describe('Invalid court id format', () => {
          it('Should return 400 and an error message for court id format is not uuid', () => {});
        });
      });
      describe('Invalid time slot', () => {
        describe('Not an active date of branch', () => {
          it('Should return 409 and an error message not valid date', () => {});
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
