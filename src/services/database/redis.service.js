import redis from 'redis';

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis",  
    port: process.env.REDIS_PORT || 6379,
  }
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

await redisClient.connect();  

export default redisClient;
