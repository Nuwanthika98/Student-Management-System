import express from 'express';
import 'dotenv/config';
import { databaseConnection } from './src/services/database/database.service.js';
import routes from './routes.js';

const server = express();
const HTTP_PORT = process.env.HTTP_PORT;
const DATABASE_URI = process.env.DATABASE_URI;

server.use(express.json());
server.use('/api', routes);

server.listen(HTTP_PORT, async () => {
    console.log(`Server listning on port ${HTTP_PORT}`);
    await databaseConnection(DATABASE_URI);
});

export {server};