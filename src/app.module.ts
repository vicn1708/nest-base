import { Module } from '@nestjs/common';
import { Logging } from './common/providers/logging/logging';
import { ModelsModule } from './common/models/models.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@common/interceptors/logging/logging.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform/transform.interceptor';
import { AllExceptionFilter } from '@common/exceptions/customExceptionFilter';
import { ApiModule } from './modules/api.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ModelsModule,
    UserModule,
    ApiModule,
  ],
  providers: [
    Logging,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
