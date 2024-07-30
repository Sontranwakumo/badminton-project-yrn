import { Test, TestingModule } from '@nestjs/testing';
import { OrderFormsController } from './order-forms.controller.js';
import { OrderFormsService } from './order-forms.service.js';
import { IMPORT_MODULES } from '../../../test/utils/utils.js';
import { OrderFormsModule } from './order-forms.module.js';

describe('OrderFormsController', () => {
  let controller: OrderFormsController;
  let service: OrderFormsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...IMPORT_MODULES,OrderFormsModule]
    }).compile();
    controller = module.get<OrderFormsController>(OrderFormsController);
    service = module.get<OrderFormsService>(OrderFormsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST v1/order-forms',()=>{
    describe('Valid body request',()=>{
      it('Should return created order forms ',()=>{
        // a: b
        
      });
    });
    describe('Invalid',()=>{
      describe('Invalid sender id',()=>{
        describe('Sender parameter is null',()=>{
          it('Should return 404 and an error message for user that does not exist',()=>{
            
          });
        })
        describe ('Invalid format sender id',()=>{
          it('Should return 400 and an error message user ID is not uuid format',()=>{
            
          });
        })
        describe ('Nonexistent user',()=>{
          it('Should return 404 and an error message for user that does not exist',()=>{
            
          });
        })
      });
      describe('Invalid court id',()=>{
        describe('Court id parameter is null or not exist',()=>{
          it('Should return 404 and an error message for court id does not exist',()=>{
            
          });
        })
        describe ('Invalid court id format',()=>{
          it('Should return 400 and an error message for court id format is not uuid',()=>{
            
          });
        })
      })
      describe('Invalid time slot',()=>{
        describe('Not an active date of branch',()=>{
          it('Should return 409 and an error message not valid date',()=>{
            
          });
        });
        describe('Invalid start time',()=>{
          it('Should return 406 and an error message not valid start time',()=>{
            
          });
        });
        describe('Invalid end time',()=>{
          it('Should return 406 and an error message not valid end time',()=>{
            
          });
          
        });
        describe('Invalid time range',()=>{
          it('Should return 406 and an error message not valid time range',()=>{
            
          });
        });
      })
    });
  })
});
