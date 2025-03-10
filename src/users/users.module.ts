import { Module } from '@nestjs/common';
import { UsersService} from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, User } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: userSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
