import { IsDefined, IsString, IsEmail, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsDefined({
        message: "userName field must be filled!"
    })
    @IsString()
    userName : string
    @IsDefined({
        message: "Email field must be filled!"
    })
    @IsEmail()
    email : string
    @IsDefined({
        message: "Password field must be filled!"
    })
    @IsStrongPassword()
    password : string
}
