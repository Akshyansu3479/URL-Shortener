const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = new Redis({
  socket: {
    host: process.env.REDIS_URL,
    port: 6379
  },
  password: "AkshyansuPritam17",
  username: "default",
});

module.exports = redisClient;

// const Redis = require("ioredis");
// const dotenv = require("dotenv");
// dotenv.config();
// const redisClient = new Redis(process.env.REDIS_URL);
// module.exports = redisClient;

// const redisClient = Redis.createClient({
//     socket: {
//       host: process.env.REDIS_URL,
//       port: 6379
//     },
//     password: "AkshyansuPritam17",
//     username: "default"
//   });