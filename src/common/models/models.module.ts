import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '157.230.252.212',
      port: 5432,
      password: '2103@Eunseok',
      username: 'postgres',
      entities: [User, Role],
      database: 'library',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  exports: [TypeOrmModule],
})
export class ModelsModule {}
