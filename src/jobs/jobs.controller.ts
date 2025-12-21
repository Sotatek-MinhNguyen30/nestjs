import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly JobsService: JobsService) {}

  @Post()
  @ResponseMessage("Create a new job")
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.JobsService.create(createJobDto, user);
  }

  @Get()
  @ResponseMessage("Fetch jobs with pagination")
  findAll(
    @Query("current") currentPage: string, //const currentPage: string = req.query.page
    @Query("pageSize") limit: string,
    @Query() qs: string //qs = query string -> page + limit
  ) {
    return this.JobsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a job by id")
  async findOne(@Param('id') id: string) {
    let foundJob = await this.JobsService.findOne(id)
    return foundJob;
  }

  @Patch(':id')
  @ResponseMessage("Update a job")
  update(
    @Param('id') id: string, 
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser
  ) {
    return this.JobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a job")
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.JobsService.remove(id, user);
  }
}
