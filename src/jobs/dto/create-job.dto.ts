import { Transform, Type } from 'class-transformer';
import { IsArray, isArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
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
export class CreateJobDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsNotEmpty({message: 'Skills không đc để trống',})
    @IsArray({message: 'Skills có định dạng là array',})
    @IsString({each: true, message: 'Skills có định dạng là string',})
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty({message: 'Salary không đc để trống',})
    salary: number;

    @IsNotEmpty({message: 'Quantity không đc để trống',})
    quantity: number;

    @IsNotEmpty({message: 'Level không đc để trống',})
    level: string;

    @IsNotEmpty({message: 'Description không đc để trống',})
    description: string;
    
    @IsNotEmpty({message: 'startDate không đc để trống',})
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'startDate có định dạng là Date' })
    startDate: Date;

    @IsNotEmpty({message: 'endDate không đc để trống',})
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'endDate có định dạng là Date' })
    endDate: Date;

    @IsNotEmpty({message: 'isActive không đc để trống',})
    @IsBoolean({ message: 'isActive có định dạng là boolean' })
    isActive: boolean;

}

// cho Job
export class RegisterJobDto {
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
