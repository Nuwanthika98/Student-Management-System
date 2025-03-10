import studentModel from "./student.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleFileUpload } from "../../services/file_uploads/file_upload.service.js";
import "dotenv/config";
import { sendEmail } from "../../services/email/email.service.js";
import redisClient from "../../services/database/redis.service.js"; 
import {notifyUser} from '../../services/websocket/websocket.service.js';

const studentService = {
  registerStudent: async (data, files) => {
    const { email, ...studentData } = data;

    const exsistingStudent = await studentModel.findOne({ email });
    if (exsistingStudent) {
      throw new Error("Email already exsists!");
    }

    let filePath = null;

    if (files && Object.keys(files).length > 0) {
      console.log(files);

      filePath = await handleFileUpload(files);
      if (!filePath) {
        throw new Error("Unable to find the filepath!");
      }
    }

    const student = await studentModel.create({
      email,
      profile_image: filePath,
      ...studentData,
    });
    if (!student) {
      throw new Error("Registration failed!");
    }
    const studentObject = student.toObject();
    delete studentObject.password;

    return studentObject;
  },

  loginStudent: async (body) => {
    const studentRes = await studentModel.findOne({ email: body.email });
    if (!studentRes) {
      throw new Error("Student not found!");
    }
    const isMatch = await bcrypt.compare(body.password, studentRes.password);
    if (!isMatch) {
      throw new Error("Incorrect password!");
    }

    if (studentRes.is2FAEnabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await studentService.send2FACode(studentRes.email, code);
      const response = {
        message: "OTP sent, please verify!",
        student_email: studentRes.email,
      };
      return response;
    }

    const access_token = jwt.sign(
      {
        student_id: studentRes._id,
        email: studentRes.email,
        role: studentRes.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const student = studentRes.toObject();
    delete student.password;
    const response = { student, access_token };

    return response;
  },

  send2FACode: async (email, code) => {
    const subject = "2FA code";
    const text = `Your OTP is ${code}`;

    const res = await sendEmail(email, subject, text);

    if (res && res.accepted && res.accepted.length > 0) {
      await redisClient.setEx(`otp:${email}`, 300, code);
    } else {
      throw new Error("Failed to send 2FA code!");
    }
  },

  verify2FA: async (email) => {
    const studentRes = await studentModel.findOne({ email });
    if (!studentRes) {
      throw new Error("Student not found!");
    }

    const access_token = jwt.sign(
      {
        student_id: studentRes._id,
        email: studentRes.email,
        role: studentRes.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const student = studentRes.toObject();
    delete student.password;
    const response = { student, access_token };
    return response;
  },

  getStudentById: async (student_id) => {
    const student = await studentModel.findById(student_id);
    if (!student) {
      throw new Error("Student not found!");
    }
    const studentObject = student.toObject();
    delete studentObject.password;

    return studentObject;
  },

  getAllStudents: async () => {
    const response = await studentModel.find();
    if (!response || response.length == 0) {
      throw new error("No students!");
    }
    const students = response.map((student) => {
      const studentObject = student.toObject();
      delete studentObject.password;
      return studentObject;
    });

    return students;
  },

  generateAndNotifyUniqueKeys: async () => {
    const users = await studentModel.find({}, "_id"); 

    for (const user of users) {
      const uniqueKey = Math.random().toString(36).substring(2, 10); 

      await redisClient.set(`uniqueKey:${user._id}`, uniqueKey, { EX: 300 });

      console.log(`Key for user ${user._id}: ${uniqueKey}`);

      notifyUser(user._id, uniqueKey);
    }
  },
};

export default studentService;
