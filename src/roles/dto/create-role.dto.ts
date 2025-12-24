import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';


export class CreateRoleDto {
    @IsNotEmpty({message: 'Name không đc để trống',})
    name: string;

    @IsNotEmpty({message: 'description không đc để trống',})
    description: string;

    @IsNotEmpty({message: 'isActive không đc để trống',})
    @IsBoolean({message: 'isActive có giá trị là boolean',})
    isActive: boolean;

    @IsNotEmpty({ message: 'permissions không đc để trống', })
    @IsMongoId({ each: true, message: 'each permission là mongo object id', })
    @IsArray({ message: 'permissions có định dạng là array', })
    permissions: mongoose.Schema.Types.ObjectId[];

}
