import { Test, TestingModule } from '@nestjs/testing';
import { OrderFormsController } from './order-forms.controller.js';
import { OrderFormsService } from './order-forms.service.js';

describe('OrderFormsController', () => {
  let controller: OrderFormsController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [OrderFormsController],
    //   providers: [OrderFormsService],
    // }).compile();

    // controller = module.get<OrderFormsController>(OrderFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST v1/order-forms',()=>{
    describe('Valid',()=>{

    });
    describe('Invalid',()=>{
      describe('Invalid user id',()=>{

      });
      describe('Invalid court id',()=>{

      })
      describe('Invalid book status',()=>{
      
      })
      describe('Invalid time slot',()=>{
      
      })
    });
  })
});
