import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	async getHello() {
		await this.cacheManager.set('k', 123, { ttl: 0 });
		const cachedItem = await this.cacheManager.get('k');
		console.log(cachedItem);

		return 'Hello World!';
	}
}
