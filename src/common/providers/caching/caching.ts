import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class Caching {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setValue<T>(key: string, value: T) {
    const time = 30000; //* 30 seconds
    await this.cacheManager.set(key, JSON.stringify(value), time);
  }

  async getValue(key: string) {
    const value = await this.cacheManager.get(key);
    return value ? JSON.parse(value as string) : null;
  }

  async clearValue(key: string) {
    return await this.cacheManager.del(key);
  }

  async handleCaching<T>(key: string, value: Promise<T>) {
    const cache = await this.getValue(key);

    if (cache) return cache;

    const [setValue, result] = await Promise.all([
      this.setValue(key, await value),
      value,
    ]);

    return result;
  }
}