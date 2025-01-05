import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {

  db: PrismaService

  constructor(db : PrismaService) {
    this.db = db;
  }
  
  create(data: CreateProductDto) {
    return this.db.products.create({
      data
    });
  }

  findAll() {
    return this.db.products.findMany();
  }

  findOne(id: number) {
    return this.db.products.findUnique({
      where: {id}
    });
  }

  update(id: number, data: UpdateProductDto) {
    return this.db.products.update({
      where: {id},
      data
    });
  }

  remove(id: number) {
    return this.db.products.delete({
      where: {id}
    });
  }
}
