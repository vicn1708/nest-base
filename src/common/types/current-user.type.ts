import { TypeJWT } from '@common/constants/jwt.enum';
import { User } from '@common/models/entity';

export interface ICurrentUser extends User {
  typeToken: TypeJWT;
}
