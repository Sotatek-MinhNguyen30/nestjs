import { IsNotEmpty } from 'class-validator';


export class CreatePermissionDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsNotEmpty({message: 'apiPath không đc để trống',})
    apiPath: string;

    @IsNotEmpty({message: 'method không đc để trống',})
    method: string;

    @IsNotEmpty({message: 'module không đc để trống',})
    module: string;

}
