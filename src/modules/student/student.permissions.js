import { verify } from "crypto";

const studentPermission = {
    registerStudent: {
        path: '/',
        //authorized_roles: ['student', 'admin', 'super_admin'],
    },
    loginStudent: {
        path: '/login',
    },
    verify2FA: {
        path: '/verify2fa',
    },
    getStudentById: {
        path: '/:id'
    },
    getAllStudents: {
        path: '/'
    },
}

export default studentPermission;