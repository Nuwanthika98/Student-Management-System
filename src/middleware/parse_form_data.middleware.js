import formidable from 'formidable';

export const parseFormData = (req, res, next) => {
    const form = formidable({
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, 
        multiples: false, 
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(new Error('Failed to parse form data: ' + err.message)); 
        }

        req.body = {};
        for (let key in fields) {
            req.body[key] = fields[key].length === 1 ? fields[key][0] : fields[key];
        } 
        req.files = files;  
        
        next(); 
    });
};
