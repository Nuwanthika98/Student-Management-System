import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        required: true,
        default: 'admin',
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true, strict: false});

AdminSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

export default mongoose.model('admin', AdminSchema);