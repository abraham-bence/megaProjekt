import { IsDefined, IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateProductDto {
   @IsDefined({
    message: "Name field must be filled!"
   })
   @IsString()
   name : string
   @IsDefined({
    message: "Stock field must be filled!"
   })
   @IsNumber()
   stock : number
   @IsDefined({
    message: "Price field must be filled!"
   })
   @IsNumber()
   price : number
}
