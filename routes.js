import express from 'express';
import studentRoutes from './src/modules/student/student.router.js';

const router = express.Router();

router.use('/student', studentRoutes);

export default router;