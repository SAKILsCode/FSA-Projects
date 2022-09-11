const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const adminAttendanceRoute = require('./admin-attendance');
const studentAttendanceRoute = require('./student-attendance');
const authenticate = require('../middleware/authenticate');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, userRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoute);
router.use('/api/v1/student/attendance', authenticate, studentAttendanceRoute);

module.exports = router;
