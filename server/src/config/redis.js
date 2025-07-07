// redis.js
import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL,{
    maxRetriesPerRequest: 5,
  reconnectOnError: () => true,
});

export default redis;
