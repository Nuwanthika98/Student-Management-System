import joi from 'joi';

const adminSchema = {
    registerAdmin: joi.object({
        name: joi.string().min(2).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    }),
    loginAdmin: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
}

export default adminSchema;