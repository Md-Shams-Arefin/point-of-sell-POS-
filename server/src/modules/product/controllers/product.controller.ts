import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "../services/product.service";

@Controller('/products')
export class ProductController {

  constructor(private readonly productService:ProductService){}

  @Post('/')
  async createProduct(@Body() data:object){
    const product = await this.productService.createProduct(data);
    return product;
  }


  @Get('/')
  async getProducts(){
    const products = await this.productService.getProducts();
    return products;
  }

}