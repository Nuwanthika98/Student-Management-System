import express from 'express';
import studentRoutes from './src/modules/student/student.router.js';
import adminRoutes from './src/modules/admin/admin.router.js';

const router = express.Router();

router.use('/student', studentRoutes);
router.use('/admin', adminRoutes);

export default router;