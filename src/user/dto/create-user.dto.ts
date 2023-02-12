import { Type } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    readonly role: number;


    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(8)
    @MaxLength(20)
    readonly password: string;

    // @IsString()
    // @MinLength(8)
    // @MaxLength(20)
    // @IsEqualTo('password')
    // passwordConfirm: string;
}
