import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-Job.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateJobDto extends OmitType(CreateJobDto, ['name'] as const) {
    _id: string;
}
