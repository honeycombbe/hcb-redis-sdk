import { RedisConfig } from './interfaces/redis.interface';
export declare class RedisService {
    private redisClient;
    private redisParams;
    constructor(redisConfig: RedisConfig);
    private connectRedis;
    getRedisConnection(): any;
}
