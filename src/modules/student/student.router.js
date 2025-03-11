import express from 'express';
import studentController from './student.controller.js';
import validator from '../../middleware/validation.middleware.js';
import studentSchema from './student.schema.js';
import studentPermission from './student.permissions.js';
import { parseFormData } from '../../middleware/parse_form_data.middleware.js';
import rateLimiter from '../../middleware/rate_limit.middleware.js';
import authenticateUser from '../../middleware/auth.middleware.js';

const router = express.Router();

router.route(studentPermission.registerStudent.path).post(
    parseFormData,
    studentController.registerStudent,
)

router.route(studentPermission.loginStudent.path).post(
    rateLimiter.loginLimit,
    validator.validateBody(studentSchema.loginStudent),
    studentController.loginStudent,
)

router.route(studentPermission.verify2FA.path).post(
    authenticateUser.verify2FA,
    studentController.verify2FA
)

router.route(studentPermission.getStudentById.path).get(
    authenticateUser.authenticateJwt,
    studentController.getStudentById,
)

router.route(studentPermission.getAllStudents.path).get(
    authenticateUser.authenticateJwt,
    studentController.getAllStudents,
)

export default router;