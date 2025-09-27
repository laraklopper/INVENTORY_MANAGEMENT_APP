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

// ============== MONGODB EVENT HANDLERS ================
// Event listener triggered on MongoDB connection errors
mongoose.connection.on('error', (error) => {
    console.error(`[ERROR: connectDB.js]Error connecting to MongoDb database. Exiting now...`, error);
    process.exit(1);//Exit the process with a failure code
})

//Function executed when the connection is lost
mongoose.connection.on("disconnected", () => {
    console.warn("[WARNING: connectDB.js] MongoDB Disconnected! Reconnecting...");
    connectDB();// Try to reconnect if the connection is lost
});

// Set up an event listener for the 'reconnected' event on the Mongoose connection
mongoose.connection.on("reconnected", () => {
    console.log("[INFO: connectDB.js] MongoDB Reconnected!");
});

// Triggered once when MongoDB is connected for the first time
mongoose.connection.once('open', async () => {
    console.log("[SUCCESS: connectDB.JS] Database connection established");
});


module.exports = connectDB;