import { rateLimit } from "express-rate-limit";

const rateLimiter = {
    loginLimit: rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 5, 
        message: 'Too many attempts to login, please try again after 5 minutes',
        standardHeaders: true,
        legacyHeaders: false,
    })
}

export default rateLimiter;