import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export const development: boolean = true;

export const appSettings = {
  port: process.env.PORT || 3000,
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    synchronize: true,
    // logging: development,
  } as TypeOrmModuleOptions,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    expiresInRefresh: process.env.JWT_EXPIRES_IN_REFRESH,
  },
  role: {
    ADMIN: Number(process.env.ROLE_ADMIN),
    CAMPUS_MANAGER: Number(process.env.ROLE_CAMPUS_MANAGER),
    STUDENT: Number(process.env.ROLE_STUDENT),
    TEACHER: Number(process.env.ROLE_TEACHER),
  },
};
