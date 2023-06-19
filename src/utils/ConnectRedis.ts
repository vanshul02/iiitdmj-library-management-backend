import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: 18800
  }
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;