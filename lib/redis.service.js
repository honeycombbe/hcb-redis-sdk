"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
var Redis = require("ioredis");
var RedisService = /** @class */ (function () {
    function RedisService(redisConfig) {
        this.redisParams = {};
        this.redisParams = redisConfig;
        this.connectRedis();
    }
    RedisService.prototype.connectRedis = function () {
        this.redisClient = new Redis(this.redisParams);
    };
    RedisService.prototype.getRedisConnection = function () {
        return this.redisClient;
    };
    return RedisService;
}());
exports.RedisService = RedisService;
