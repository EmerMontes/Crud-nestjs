import { Body, Controller, Get, Post, Put, Headers, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { NewPasswordDto } from './dto/newPassword.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async loginUser(@Body() data: LoginDto): Promise<any>{
    return await this.appService.loginUser(data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('refresh_token')
  async refreshToken(@Headers('auth') auth: string): Promise<any>{
    return await this.appService.refreshToken(auth)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({type: ForgotPasswordDto})
  @Put('forgot_password')
  async forgotPassword(@Body('email') email: string): Promise<any>{
    return await this.appService.forgotPassword(email)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({type: NewPasswordDto})
  @Put('new_password')
  async newPassword(@Body('newPassword') newPassword: string, @Headers('auth') auth: string ): Promise<any>{
    const data = {
      newPassword, 
      auth
    }
    return await this.appService.newPassword(data)
  }

}
