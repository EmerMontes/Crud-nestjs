import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';

import { User, userSchema } from './users/entities/user.entity';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { JwtService } from './jwt/jwt.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
          ConfigModule.forRoot({isGlobal: true}),
          UsersModule,
          JwtModule,
          NestJwtModule.register({
            secret: 'test_secret',
            signOptions: { expiresIn: '1h' }, 
          }),
          MongooseModule.forRoot(process.env.MONGO_URI),
        ],
      controllers: [AppController],
      providers: [AppService, 
        UsersModule,
        {
          provide: getModelToken(User.name), 
          useValue: {
            findOne: jest.fn(), 
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: { handleRequest: jest.fn(() => true) },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Unauthorized"', async () => {
      jest
        .spyOn(appService, 'loginUser')
        .mockRejectedValue(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));
      await expect(
        appController.loginUser({ email: 'emer@example.com', password: '123456789' }),
      ).rejects.toThrow(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));
    });
  });

  describe('root', () => {
    it('should return "access_token"', async () => {
      jest
        .spyOn(appService, 'loginUser')
        .mockResolvedValue({ access_token: 'fake-jwt-token' }); 
  
      const result = await appController.loginUser({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result).toHaveProperty('access_token'); 
    });
  })
});
