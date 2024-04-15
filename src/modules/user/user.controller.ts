import { Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomController } from '@common/decorators/custom-controller.decorator';

@CustomController('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  getHello(): string {
    return this.userService.hello();
  }
}
