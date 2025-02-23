import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserDocument} from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { last } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserSeeder {
  
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async seed(): Promise<void> {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      {
        name: 'Usuario',
        lastName: 'prueba',
        email: 'test@example.com',
        password: hashedPassword,
        isActive: true,
      },
      {
        name: 'Prueba',
        lastName: 'BROERS',
        email: 'admin@example.com',
        password: hashedPassword,
        isActive: true,
      },
      {
        name: 'alexander',
        lastName: 'arnold',
        email: 'alexander12345@example.com',
        password: hashedPassword,
        isActive: true,
      },
      {
        name: 'luis',
        lastName: 'diaz',
        email: 'diazRegate@example.com',
        password: hashedPassword,
        isActive: true,
      },
      {
        name: 'mohamed',
        lastName: 'salah',
        email: 'salahGol@example.com',
        password: hashedPassword,
        isActive: true,
      },
      {
        name: 'Di',
        lastName: 'Maria',
        email: 'diMaria@example.com',
        password: hashedPassword,
        isActive: true,
      },
    ];

    try {
        await this.userModel.insertMany(users);
        console.log(`${users.length} test users successfully created`);
      } catch (error) {
        console.error('Error creating test users:', error.message);
      }
    }
}
