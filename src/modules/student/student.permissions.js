const studentPermission = {
    registerStudent: {
        path: '/',
        //authorized_roles: ['student', 'admin', 'super_admin'],
    },
    loginStudent: {
        path: '/login',
    },
    getStudentById: {
        path: '/:id'
    },
    getAllStudents: {
        path: '/'
    },
}

export default studentPermission;