import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './users/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from './jwt/jwt.service';
import { errors, jwt, linkVerifiction } from './app.constanst';
import { recoverPasswordEmail } from './nodemailer/nodemailer.service';

@Injectable()
export class AppService {

 constructor(@InjectModel(User.name) 
 private userModel: Model<UserDocument>,
 private jwtService: JwtService
 ){}


  async loginUser(data: LoginDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({email: data.email})
      if (!user) {
         throw errors.userNotExists()
      }

      const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
      if (!isPasswordCorrect) {
        throw errors.invalidCredentials();
      }
    
      if (!user.isActive) {
        throw errors.userSuspended();
      }

      return {
        name: user.name, 
        email: user.email,
        isActive: user.isActive,
        acces_token: await this.jwtService.generateToken(user, '15m',  jwt.secret ),
        refresh_token: await this.jwtService.generateToken(user, '15h', jwt.refresh)  
      };
   
    } catch (error) {
       throw errors.invalidCredentials();
    }
  }

  async refreshToken(auth: string): Promise<any> {
    try {
      const refresh_token = auth
      if (!refresh_token) {
        throw errors.invalidCredentials();
      }      
      const {_id} = await this.jwtService.verifyToken(refresh_token, jwt.refresh)
      const userFind = await this.userModel.findOne({ _id })

      return {token: await this.jwtService.generateToken(userFind, '15m', jwt.secret)}
     
    } catch (error) {
       throw errors.invalidCredentials();
    }
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email})

      if (!user) {
        throw errors.userNotExists();
      }

      const token = await this.jwtService.generateToken(user, '5m', jwt.reset )      
      const sendEmail = await recoverPasswordEmail(email, `${linkVerifiction}${token}`)
      
      return ({"Message": "Please check your email, you have five minutes for recover your password"})
        
    } catch (error) {
      throw errors.invalidCredentials();
    }
  }

  async newPassword(data: any): Promise<any> {
    try {
      const {newPassword, auth} = data
      if (!auth || !newPassword) {
        throw errors.invalidCredentials();
      }

      const {_id} = await this.jwtService.verifyToken(auth, jwt.reset)
      const user = await this.userModel.findOne({_id})
      if (!user) {
        throw errors.userNotExists
      }
      
      const hashePassword = await bcrypt.hash(newPassword, 10)
      return await this.userModel.updateOne({_id}, {$set: {'password': hashePassword}})
      
    } catch (error) {
      throw errors.invalidCredentials();
    }
  }

}
