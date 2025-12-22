import { IsEmail, IsNotEmpty } from 'class-validator';


// data transfer object
export class CreateCompanyDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsNotEmpty({message: 'Address không đc để trống',})
    address: string;

    @IsNotEmpty({message: 'Description không đc để trống',})
    description: string;

    @IsNotEmpty({message: 'Description không đc để trống',})
    logo: string;

}
