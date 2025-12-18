import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
// data transfer object

// class transformer cho company: 'object type'
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

// cho admin
export class CreateUserDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsEmail({}, {message: 'Email không đúng định dạng',})
    @IsNotEmpty({message: 'Email không đc để trống',})
    email: string;

    @IsNotEmpty({message: 'Password không đc để trống',})
    password: string;

    @IsNotEmpty({message: 'Age không đc để trống',})
    age: number;

    @IsNotEmpty({message: 'Gender không đc để trống',})
    gender: string;

    @IsNotEmpty({message: 'Address không đc để trống',})
    address: string;

    @IsNotEmpty({message: 'Role không đc để trống',})
    role: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}

// cho user
export class RegisterUserDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsEmail({}, {message: 'Email không đúng định dạng',})
    @IsNotEmpty({message: 'Email không đc để trống',})
    email: string;

    @IsNotEmpty({message: 'Password không đc để trống',})
    password: string;

    @IsNotEmpty({message: 'Age không đc để trống',})
    age: number;

    @IsNotEmpty({message: 'Gender không đc để trống',})
    gender: string;

    @IsNotEmpty({message: 'Address không đc để trống',})
    address: string;
}
