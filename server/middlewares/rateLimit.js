
/*

const redisClient = require("../config/redis");

const rateLimit = async (req, res, next) => { 
   
  try {
   const ip = req.connection.remoteAddress;
   console.log("ip: ", ip);
   const redisData = await redisClient
    .multi()
    .incr(ip)
    .expire(ip, process.env.EXPIRATION_TIME)
    .exec();
   console.log("redisData: ", redisData);
   const hitsCountByIP = redisData[0][1];

   console.log("hits:", hitsCountByIP);

  if (hitsCountByIP > process.env.HITS_COUNT_LIMIT) {
    res.status(429).json({ status: "Failed", message: "Limit Exceeded" });
  } else next();
    
  } catch (error) {
    console.log("Error from ratelimit: ", error);
  }
  
};

module.exports = rateLimit;
*/

//////////////


const redisClient = require("../config/redis");

const rateLimit = async (req, res, next) => {
  try {
    const ip = req.connection.remoteAddress;
    console.log("ip:", ip);
    
    const redisData = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, parseInt(process.env.EXPIRATION_TIME)) // Ensure EXPIRATION_TIME is an integer (in seconds)
      .exec();

    const hitsCountByIP = redisData[0][1];

    if (hitsCountByIP > parseInt(process.env.HITS_COUNT_LIMIT)) {
      res.status(429).json({ status: "Failed", message: "Limit Exceeded" });
    } else {
      next();
    }

  } catch (error) {
    console.log("Error from ratelimit: ", error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = rateLimit;

