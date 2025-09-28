require('dotenv').config();
const ensureJwtSecret = require('./util/ensureJwtKey')
ensureJwtSecret();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const connectDB = require('./config/connect')
const userRouter = require('./routes/userRoutes')
const port = process.env.PORT || 3001;

if (!port) {
    console.error('[ERROR: app.js] port enviromental variable is missing');
    process.exit(1)
}

const app = express()

//===========SETUP MIDDLEWARE======================
app.use(express.json());
app.use(cors());
app.use(helmet());

//================MOUNT ROUTES========
app.use('/user', userRouter )
mongoose.set('strictPopulate', false);

//==========START THE SERVER================
// Start the server and listen on the specified port after the DB connects
connectDB().then(() => {
    app.listen(port, () => {
        console.info(`[INFO: app.js] Server is running on port: ${port}`);
    })
}).catch(error => {
    console.error('[ERROR: app.js] Database connection failed:', error);
    process.exit(1);
})