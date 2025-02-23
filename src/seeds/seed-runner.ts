import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeeder } from './users.seed';


async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seeder = app.get(UserSeeder);
  
  await seeder.seed();
  console.log('Seeding process completed');
  
  await app.close();
}

bootstrap();