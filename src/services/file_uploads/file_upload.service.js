import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadFolder = path.join(__dirname, "..", "..", "uploads");

export const handleFileUpload = async (files) => {
    return new Promise((resolve, reject) => {
    
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }

        const uploadedFile = files.profile_image ? files.profile_image[0] : null;
        if (!uploadedFile || !uploadedFile.filepath) {
            return reject(new Error('No file uploaded.'));
        }

        const filePath = path.join(uploadFolder, uploadedFile.newFilename);

        fs.rename(uploadedFile.filepath, filePath, (err) => {
            if (err && err.code === 'EXDEV') {
                fs.copyFile(uploadedFile.filepath, filePath, (copyErr) => {
                    if (copyErr) {
                        return reject(new Error('File copy failed: ' + copyErr.message));
                    }

                    fs.unlink(uploadedFile.filepath, (unlinkErr) => {
                        if (unlinkErr) {
                            return reject(new Error('Failed to delete original file: ' + unlinkErr.message));
                        }

                        resolve(filePath);  
                    });
                });
            } else if (err) {
                return reject(new Error('File upload failed: ' + err.message));
            } else {
                resolve(filePath);
            }
        });
    });
};
