import studentModel from './student.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleFileUpload } from '../../services/file_uploads/file_upload.service.js';
import 'dotenv/config';

const studentService = {
    registerStudent: async (data, files) => {
        const { email, ...studentData } = data; 
        
        const exsistingStudent = await studentModel.findOne({email});
        if(exsistingStudent){
            throw new Error('Email already exsists!');
        }

        const filePath = await handleFileUpload(files);
        if(!filePath){
            throw new Error('Unable to find the filepath!');
        }

        const student = await studentModel.create({email, profile_image: filePath, ...studentData});
        if(!student){
            throw new Error('Registration failed!');
        }
        const studentObject = student.toObject();
        delete studentObject.password;

        return studentObject;
    },

    loginStudent: async (body) => {
        const studentRes = await studentModel.findOne({email: body.email});
        if(!studentRes){
            throw new Error('Student not found!');
        };
        const isMatch = await bcrypt.compare(body.password, studentRes.password);
        if(!isMatch){
            throw new Error('Incorrect password!');
        };
        const access_token = jwt.sign(
            {student_id: studentRes._id, email: studentRes.email, role:studentRes.role},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN},
        )
        
        const student = studentRes.toObject();
        delete student.password;
        const response = {student, access_token}

        return response;
    },

    getStudentById: async (student_id) => {
        const student = await studentModel.findById(student_id);
        if(!student){
            throw new Error('Student not found!');
        }
        const studentObject = student.toObject();
        delete studentObject.password;

        return studentObject;
    },

    getAllStudents: async () => {
        const response = await studentModel.find();
        if(!response || response.length == 0){
            throw new error('No students!');
        }
        const students = response.map(student => {
            const studentObject = student.toObject();
            delete studentObject.password;
            return studentObject;
        })

        return students;
    },
};

export default studentService;