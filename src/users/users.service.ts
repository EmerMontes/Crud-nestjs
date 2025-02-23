import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}


  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashePassword = await bcrypt.hash(createUserDto.password, 10)

      const newUser = new this.userModel({...createUserDto,
       password: hashePassword
      })
      return await newUser.save()

    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST)
    };
  }

  findAll() {
    try {
      return this.userModel.find()
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }

  findOne(id: string) {
    try {
      return this.userModel.find({_id: id})
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      console.log(updateUserDto)
      const resultUpdate = await this.userModel.updateOne(
        { _id: new Types.ObjectId(id)}, {$set: updateUserDto}
      )
      console.log(resultUpdate)

      return resultUpdate.modifiedCount ? {"message": "user updated successfully"} : {"message" : "Internal Server Error"}
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }

  async remove(id: string) {
    try {
       await this.userModel.deleteOne({_id:id})
       return {"message":  "user deleted successfully"}
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    };
  }
}
