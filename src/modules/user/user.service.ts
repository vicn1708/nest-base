import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  hello() {
    return 'Hello World!';
  }
}
