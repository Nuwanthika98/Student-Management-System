import joi from 'joi';

const studentSchema = {
    registerStudent: joi.object({
        name: joi.string().min(2).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        profile_image: joi.string().uri().optional(),
    }),
    loginStudent: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
}

export default studentSchema;