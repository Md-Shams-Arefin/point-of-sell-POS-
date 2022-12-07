import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>){}

  async createProduct(data){
     const product = await this.productRepo.create(data)
     return this.productRepo.save(product);
  }

  getProducts(){
    return this.productRepo.find();
  }

}