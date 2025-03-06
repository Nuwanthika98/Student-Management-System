import mongoose from 'mongoose';

const databaseConnection = async (database_uri) => {
    try {
        await mongoose.connect(database_uri);
        console.log('MongoDB Connected');
    } catch (error) {
        throw new Error('Database connection error',error.message);
    }
}

export {databaseConnection}