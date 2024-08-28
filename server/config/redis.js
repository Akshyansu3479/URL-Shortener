const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = Redis.createClient({
    socket: {
      host: "master.redis-url-shortener-rate-limiter.puaofd.aps1.cache.amazonaws.com:6379",
      port: 6379
    },
    password: "AkshyansuPritam17",
    username: "default"
  });

module.exports = redisClient;


// const Redis = require("ioredis");
// const dotenv = require("dotenv");
// dotenv.config();

// const redisClient = new Redis(process.env.REDIS_URL);

// module.exports = redisClient;
