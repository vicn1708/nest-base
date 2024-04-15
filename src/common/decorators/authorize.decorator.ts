import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles } from './role.decorator';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { TypeUser } from '@common/constants/role.enum';

export const Authorize = (...args: TypeUser[]) => {
  return applyDecorators(Roles(...args), UseGuards(JwtAuthGuard, RolesGuard));
};
