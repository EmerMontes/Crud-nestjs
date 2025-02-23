import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { JwtModule, JwtModule as NestJwtModule } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, userSchema, UserDocument } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Model } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let model: Model<User>;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
         ConfigModule.forRoot({isGlobal: true}),
         JwtModule.register({ secret: 'test_secret' }),
         MongooseModule.forRoot(process.env.MONGO_URI),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
        provide: getModelToken(User.name),
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
        },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name))
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { name: 'testuser', password: '123456', lastName: 'Test', email: 'email@test.com', isActive: true, createdAt: new Date( ) };
      const result = { _id: '1', ...createUserDto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createUserDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ _id: '1', username: 'testuser' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      expect(await controller.findAll()).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { _id: '1', username: 'testuser' };
      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      expect(await controller.findOne('1')).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto = { name: 'updatedUser' };
      const result = { message: 'user updated successfully' };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update('1',updateUserDto )).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const result = { message: 'user deleted successfully' };

      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
