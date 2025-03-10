import adminModel from "./admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {notifyAdmin} from '../../services/websocket/websocket.service.js';

const adminService = {
  registerAdmin: async (body) => {
    const exsistingAdmin = await adminModel.findOne({ email: body.email });
    
    if (exsistingAdmin) {
      throw new Error("Email already exsists!");
    }

    const admin = await adminModel.create(body);
    
    if (!admin) {
      throw new Error("Registration failed!");
    }
    const adminObject = admin.toObject();
    delete adminObject.password;

    return adminObject;
  },

  loginAdmin: async (body) => {
    const adminRes = await adminModel.findOne({ email: body.email });
    if (!adminRes) {
      throw new Error("Admin not found!");
    }
    const isMatch = await bcrypt.compare(body.password, adminRes.password);
    if (!isMatch) {
      throw new Error("Incorrect password!");
    }

    const access_token = jwt.sign(
      {
        admin_id: adminRes._id,
        email: adminRes.email,
        role: adminRes.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const admin = adminRes.toObject();
    delete admin.password;
    const response = { admin, access_token };

    return response;
  },

  notifyStudentRegistration: async (student_id) => {
    const admins = await adminModel.find({}, "_id"); 

    for (const admin of admins) {
      notifyAdmin(admin._id, student_id);
    }
  },
};

export default adminService;
