import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';


@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) 
    private JobModel: SoftDeleteModel<JobDocument>
  ) { }
  
  async create(createJobDto: CreateJobDto, user: IUser) {
    const { 
      name, skills, company, salary, quantity, 
      level, description, startDate, endDate, isActive} = createJobDto;
      
    let newJob = await this.JobModel.create({name, skills, company, salary, quantity, 
      level, description, startDate, endDate, isActive,
      createdBy: {
        _id: user._id,
        email: user.email
      }
      });
    return {
      _id: newJob?._id,
      createdAt: newJob?.createdAt
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.JobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.JobModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select("-password")
      .populate(population)
      .exec();


      return {
      meta: { 
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return "not found user";

    return this.JobModel.findOne({
      _id: id,
    })
  }


  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    let updateJob = await this.JobModel.updateOne(
      {_id: id}, 
      {
        ...updateJobDto, 
        updatedBy: {
        _id: user._id,
        email: user.email
        }
      }
    )
    return updateJob;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
          return "not found user";
        }

    await this.JobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.JobModel.softDelete({
      _id: id
    })
  }
}
