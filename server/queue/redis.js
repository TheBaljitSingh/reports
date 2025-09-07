import IORedis from "ioredis";

export const redisClient = new IORedis({
    host: process.env.REDIS_ENDPOINT,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    tls:{},
    maxRetriesPerRequest: null, 
});