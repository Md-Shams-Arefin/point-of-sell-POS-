import { Body, Controller, Get, Post } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";

@Controller('/customers')
export class CustomerController {

  constructor(private readonly customerService: CustomerService){}

  @Post('/')
  createCustomer(@Body() data:object){
    const customer = this.customerService.createCustomer(data);
    return customer;
  }


  @Get('/')
  async getCustomers(){
    const customers = await this.customerService.getCustomers();
    return customers;
  }
}