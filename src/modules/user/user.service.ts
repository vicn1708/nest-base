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
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(): Promise<any> {
    const newUser = this.userRepository.create();
    newUser.age = 1;
    newUser.email = 'tuansk102@gmail.com';
    newUser.name = 'tuan';
    newUser.password = '12345678';
    newUser.username = 'tuansk1002';
    const getUser = await this.userRepository.findOne({
      where: { email: newUser.email },
    });
    if (getUser) {
      throw new ConflictException(MESSAGES.EMAIL_EXISTS);
    }
    const builder = await this.userRepository.save(newUser);
    return builder;
  }

  public async filter(): Promise<any> {
    const newUser = await this.userRepository.find({});
    console.log(newUser);
    return newUser;
  }
}
