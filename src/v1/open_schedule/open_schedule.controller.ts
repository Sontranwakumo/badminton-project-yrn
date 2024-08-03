import {
    Controller,
    Post,
  } from '@nestjs/common';
  
@Controller('v1/branches/:branchid/open-schedule')
export class DefaultPriceController {
constructor(private readonly orderFormsService: DefaultPriceController) {}

@Post()
    async create() {
        // console.log("post order-forms");s
        return this.orderFormsService.create();
    }
}


//Get  v1/user/:iduser/order-forms
//Get  v1/courts/:idcourt/order-forms



//Get  v1/order-forms?sender_id=&courts=
//Get  v1/order-forms?


// user/:id/....