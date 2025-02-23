import { HttpException, HttpStatus } from "@nestjs/common"
import * as dotenv from 'dotenv'

dotenv.config()
export const jwt ={
    secret: process.env.JWT_SECRET || '',
    refresh: process.env.JWT_REFRESH_TOKEN || '',
    reset: process.env.JWT_RESET_TOKEN || ''
}

export const errors = {
    userNotExists: () =>  new HttpException('User not exists', HttpStatus.UNAUTHORIZED),
    invalidCredentials: () => new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
    userSuspended: () => new HttpException('User suspended', HttpStatus.FORBIDDEN),
};

export const linkVerifiction = 'http://localhost/new_password/'