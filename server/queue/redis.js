import IORedis from "ioredis";

export const redisClient = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null, 
});