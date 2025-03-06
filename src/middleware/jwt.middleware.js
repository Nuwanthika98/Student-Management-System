import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtAuth = {
  authenticateJwt: async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ status: false, data: "Invalid token" });
        }
        req.user = user;
        next();
      });
    }
  },
};

export default jwtAuth;