import {
  ClassSerializerInterceptor,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CustomController } from '@common/decorators/custom-controller.decorator';

@CustomController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('filter')
  @UseInterceptors(ClassSerializerInterceptor)
  public async filter(): Promise<any> {
    return await this.userService.filter();
  }

  @Post('create')
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(): Promise<any> {
    return await this.userService.create();
  }
}
