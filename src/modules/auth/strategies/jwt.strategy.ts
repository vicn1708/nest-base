// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { appSettings } from '@common/configs/appSetting';
// import { UsersService } from '@modules/users/users.service';
// import { ICurrentUser } from '@common/decorators/dtos/current-user.dto';
// import { TypeJWT } from '@common/constants/jwt.enum';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: appSettings.jwt.secret,
//     });
//   }

//   async validate(payload: ICurrentUser) {
//     if (!payload.typeToken) throw new UnauthorizedException();
//     if (payload.typeToken !== TypeJWT.ACCESS_TOKEN)
//       throw new UnauthorizedException('Invalid type token');

//     const user = await this.userService.findUserByEmail(payload.email);
//     const { password, ...result } = user.toObject();

//     return result;
//   }
// }
