import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }
  

  async validate(token: string) {
    const user = await this.usersService.getUserByToken(token);
    if (user) {
      return user;
    }
    else {
      throw new UnauthorizedException("Hibás token");
    }
  }
}
