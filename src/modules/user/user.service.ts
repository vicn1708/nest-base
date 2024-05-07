import { User } from '@common/models/entity/user.entity';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES } from '@common/constants';
import { appSettings } from '@common/configs/appSetting';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create(): Promise<any> {
    const newUser = this.userRepository.create();
    newUser.age = 1;
    newUser.email = 'chungdi@gmail.com';
    newUser.name = 'chungdi';
    newUser.password = '12345678';
    newUser.username = 'chungdi';
    newUser.role = appSettings.role.CAMPUS_MANAGER;
    const getUser = await this.userRepository.findOne({
      where: { email: newUser.email },
    });
    if (getUser) {
      throw new ConflictException(MESSAGES.EMAIL_EXISTS);
    }
    const builder = await this.userRepository.save(newUser);
    return builder;
  }

  async filter(): Promise<any> {
    const newUser = await this.userRepository.find({
      where: {
        username: 'chungdi',
      },
      relations: ['role'],
    });
    console.log(newUser);
    return newUser;
  }
}
