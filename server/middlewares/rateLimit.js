const redisClient = require("../config/redis");

const rateLimit = async (req, res, next) => {
   
  try {
   const ip = req.connection.remoteAddress;
   console.log("ip:", ip);
   const redisData = await redisClient
    .multi()
    .incr(ip)
    .expire(ip, process.env.EXPIRATION_TIME)
    .exec();

  const hitsCountByIP = redisData[0][1];

  if (hitsCountByIP > process.env.HITS_COUNT_LIMIT) {
    res.status(429).json({ status: "Failed", message: "Limit Exceeded" });
  } else next();
    
  } catch (error) {
    console.log("Error from ratelimit: ", error);
  }
  
};

module.exports = rateLimit;
