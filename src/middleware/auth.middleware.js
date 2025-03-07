import jwt from 'jsonwebtoken';
import redisClient from '../services/database/redis.service.js';
import 'dotenv/config';

const authenticateUser = {
  authenticateJwt: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({ status: false, data: "Not authorized!" });
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ status: false, data: "Invalid token" });
        }
        req.user = user;
        next();
      });
    }
  },
  
  verify2FA: async (req, res, next) => {
    const otp = req.body.otp;
    const email = req.query.email;

    const storedOTP = await redisClient.get(`otp:${email}`)
    console.log(`otp:${email}`);
    
    if (!storedOTP) {
      return res.status(403).send('OTP has expired!');
    }
    
    if(otp === storedOTP){
      next();
    } else{
      res.status(403).send('Invalid OTP!');
    }
  },
};

export default authenticateUser;