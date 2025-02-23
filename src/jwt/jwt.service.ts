import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwtService: NestJwtService) {}

  async generateToken(user: any, expired: string, secretKey: string) {  
    try {
      const {_id, name} = user
      return await this.jwtService.signAsync({
          _id, name},{
          secret: secretKey,
          expiresIn: expired
       });

    } catch (error) {
      throw new HttpException('Error generate token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyToken(token: string, secretKey: string) {
    try {
        return await this.jwtService.verifyAsync(token, {
          secret: secretKey
        });
      } catch (error) {
        throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
      }
  }
}