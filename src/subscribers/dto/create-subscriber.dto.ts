import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateSubscriberDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsNotEmpty({message: 'email không đc để trống',})
    @IsEmail({ message: 'email không đúng định dạng', })
    email: string;

    @IsNotEmpty({message: 'skills không đc để trống',})
    @IsArray({ message: 'skills có định dạng là array', })
    @IsString({ each: true, message: 'skills định dạng là string', })
    skills: string[];


}
