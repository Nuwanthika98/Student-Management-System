import express from 'express';
import adminController from './admin.controller.js';
import validator from '../../middleware/validation.middleware.js';
import adminSchema from './admin.schema.js';
import adminPermission from './admin.permissions.js';
import rateLimiter from '../../middleware/rate_limit.middleware.js';
import authenticateUser from '../../middleware/auth.middleware.js';

const router = express.Router();

router.route(adminPermission.registerAdmin.path).post(
    validator.validateBody(adminSchema.registerAdmin),
    adminController.registerAdmin,
)

router.route(adminPermission.loginAdmin.path).post(
    rateLimiter.loginLimit,
    validator.validateBody(adminSchema.loginAdmin),
    adminController.loginAdmin,
)

export default router;