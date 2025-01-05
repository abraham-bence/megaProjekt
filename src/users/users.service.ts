import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from "argon2"

@Injectable()
export class UsersService {

  db: PrismaService
  
    constructor(db : PrismaService) {
      this.db = db;
    }
    
  async create(createUserDto: CreateUserDto) {
    const hashedPw = await argon2.hash(createUserDto.password)
    const user = await this.db.user.create({
      data : {
        ...createUserDto,
        password: hashedPw
      }
    })
    delete user.password;
    return user;
  }

  async getUserByToken(token : string) {
    const tokenObj = await this.db.token.findUnique({
      where: {token},
      include: {user: true}
    })
    if (!tokenObj) return null;
    const user = tokenObj.user;
    delete user.password;
    return user;
  }

  findAll() {
    return this.db.user.findMany({
      include: {
        cart: {}
      }
    });
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: {id}
    });
  }

  update(id: number, data: UpdateUserDto) {
    return this.db.user.update({
      where: {id},
      data
    });
  }

  remove(id: number) {
    return this.db.user.delete({
      where: {id}
    });
  }

  addProduct(id : number, productId : number) {
    return this.db.user.update({
      where: {id},
      data: {
        cart: {
          connect : [
            {id: productId}
          ]
        } 
      },
      include: {
        cart: {}
      }
    })
  }

  removeProduct(id : number, productId : number) {
    return ;
  }
}
