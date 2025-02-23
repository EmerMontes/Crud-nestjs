import { IsBoolean, IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

@IsString()
readonly name: string

@IsString()
readonly lastName: string

@IsEmail()
readonly email: string

@IsString()
@MinLength(8)
readonly password: string

@IsDate()
readonly createdAt: Date 

@IsBoolean()
readonly isActive: Boolean

}
