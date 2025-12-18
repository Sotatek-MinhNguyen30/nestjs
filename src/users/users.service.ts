import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User as UserM } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>) {}

  getHashPassword=( password : string ) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const { name, email, password, age, gender, address, role, company } = createUserDto;

    // check logic for email
    const isExist = await this.userModel.findOne({email});
    if (isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác`);
    }

    const hashPassword = this.getHashPassword(password);
    
    let newUser = await this.userModel.create({
      name, email,
      password: hashPassword,
      age, gender, address, role, company,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
      return newUser;
        
  }

  async register(user: RegisterUserDto) {
    const { name, email, password, age, gender, address } = user;

    // check logic for email
    const isExist = await this.userModel.findOne({email});
    if (isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác`);
    }

    const hashPassword = this.getHashPassword(password);
    let newRegister = await this.userModel.create ({
      name, email,
      password: hashPassword,
      age,
      gender,
      address,
      role: "USER"
    })
    return newRegister;
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return "not found user";

    return this.userModel.findOne({
      _id: id
    })
  }

  findOnebyUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }

  // true or false
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id: updateUserDto._id}, {...updateUserDto});
  }

  async remove(id: string, user: IUser) {
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.userModel.softDelete({
      _id: id
    })
  }
}
