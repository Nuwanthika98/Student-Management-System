import studentService from "./student.service.js";

const studentController = {
    registerStudent: async (req, res) => {
        try {
            const student = await studentService.registerStudent(req.body, req.files);
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    loginStudent: async (req, res) => {
        try {
            const response = await studentService.loginStudent(req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    verify2FA: async (req, res) => {
        try {
            const student = await studentService.verify2FA(req.query.email);
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    getStudentById: async (req, res) => {
        try {
            const student = await studentService.getStudentById(req.params.id);
            res.status(200).json(student);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    getAllStudents: async (req, res) => {
        try {
            const students = await studentService.getAllStudents();
            res.status(200).json(students)
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

export default studentController;