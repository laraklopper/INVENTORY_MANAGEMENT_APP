require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL
const database = process.env.DATABASE_NAME

if (!uri || !database) {
    console.error("[ERROR: connect.js] Missing environment variables: DATABASE_URL or DATABASE_NAME");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            dbName: database,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        })
        console.log("[SUCCESS: connect.js]Successfully connected to MongoDB");
        
    } catch (error) {
        console.error("[ERROR: connect.js] Error connecting to MongoDB", error);
        process.exit(1)
    }
}

module.exports = connectDB;