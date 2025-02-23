import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .POST('/login')
      .send({
        email: 'emer@example.com',
        password: 'wrongpassword',
      })
      .expect(401)
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .POST('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(200)
  });
});
