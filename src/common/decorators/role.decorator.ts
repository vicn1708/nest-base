import { SetMetadata } from '@nestjs/common';
import { TypeUser } from '@common/constants/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypeUser[]) => SetMetadata(ROLES_KEY, roles);
