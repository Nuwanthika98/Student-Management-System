import express from 'express';
import studentController from './student.controller.js';
import validator from '../../middleware/validation.middleware.js';
import studentSchema from './student.schema.js';
import studentPermission from './student.permissions.js';
import { parseFormData } from '../../middleware/parse_form_data.middleware.js';
import rateLimiter from '../../middleware/rate_limit.middleware.js';

const router = express.Router();

router.route(studentPermission.registerStudent.path).post(
    //validator.validateBody(studentSchema.registerStudent),
    parseFormData,
    studentController.registerStudent,
)

router.route(studentPermission.loginStudent.path).post(
    rateLimiter.loginLimit,
    validator.validateBody(studentSchema.loginStudent),
    studentController.loginStudent,
)

router.route(studentPermission.getStudentById.path).get(
    studentController.getStudentById,
)

router.route(studentPermission.getAllStudents.path).get(
    studentController.getAllStudents,
)

export default router;