import joi from 'joi';

const validator = {
    validateBody: (schema) => {
        return(req, res, next) => {
            const data = req.fields && Object.keys(req.fields).length > 0 ? req.fields : req.body;
            console.log("data", data);
            
            const {error} = schema.validate(data);
            if (error){
                console.log(error);
                
                return res.status(400).json({message: error.details[0].message});
            }
            next();
        }
    }
}

export default validator;