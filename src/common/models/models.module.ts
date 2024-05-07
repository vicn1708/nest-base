import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appSettings } from '@common/configs/appSetting';
import * as provider from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...appSettings.db,
      entities: Object.values(provider),
    }),
    TypeOrmModule.forFeature(Object.values(provider)),
  ],
  exports: [TypeOrmModule],
})
export class ModelsModule {}
