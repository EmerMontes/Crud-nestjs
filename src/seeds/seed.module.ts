import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/users/entities/user.entity';
import { UserSeeder } from './users.seed';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserSeeder],
  exports: [UserSeeder],
})
export class SeedModule {}