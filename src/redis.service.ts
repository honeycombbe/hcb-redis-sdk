import { RedisConfig } from './interfaces/redis.interface';
import * as Redis from "ioredis";

export class RedisService {
    private redisClient: any;
    private redisParams: RedisConfig = {};

    constructor(redisConfig: RedisConfig){
        this.redisParams = redisConfig;
        this.connectRedis();
    }
    private connectRedis(){
        this.redisClient = new Redis(this.redisParams);
    }
    public getRedisConnection(){
        return this.redisClient;
    }
}