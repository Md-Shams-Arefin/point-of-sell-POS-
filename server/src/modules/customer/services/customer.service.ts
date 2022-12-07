import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>){}

  createCustomer(data){
   const customer = this.customerRepo.create(data);
   return this.customerRepo.save(customer);
  }

  getCustomers(){
    return this.customerRepo.find();
  }

}