import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
	imports: [
		CacheModule.register<RedisClientOptions>({
			store: redisStore,
			url: 'redis://localhost:6379',
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
