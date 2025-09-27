require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL
const database = process.env.DATABASE_NAME

if (!uri || !database) {
    console.error("[ERROR: connect.js] Missing environment variables: DATABASE_URL or DATABASE_NAME");
    process.exit(1);
}
