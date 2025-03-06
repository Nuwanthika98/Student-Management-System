import express from 'express';
import fs from 'fs';
import https from 'https';
import 'dotenv/config';
import { databaseConnection } from './src/services/database/database.service.js';
import routes from './routes.js';

const server = express();
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;
const DATABASE_URI = process.env.DATABASE_URI;

const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY),
};

server.use(express.json());
server.use('/api', routes);

(async () => {
    try {
        await databaseConnection(DATABASE_URI);
        console.log("✅ Database Connected!");

        server.listen(HTTP_PORT, () => {
            console.log(`🌐 HTTP Server running on port ${HTTP_PORT}`);
        });

        https.createServer(options, server).listen(HTTPS_PORT, () => {
            console.log(`🔒 HTTPS Server running on port ${HTTPS_PORT}`);
            
        });
    } catch (error) {
        throw new Error(error.message);
    }
})();

export {server};