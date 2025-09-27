require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const { checkJwtToken } = require('./middleware');
const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';

if (!secretKey) {
    console.warn("[WARNING: userRoute.js]: JWT_SECRET_KEY not set. Using fallback key.");  
}

//===============ROUTES=======================
//-------------GET--------------------------
router.get('/me', checkJwtToken, async (req, res) => {
    try {
        const userId = req.userId?.userId;

        if (!userId) {
            console.error(`[ERROR: userRoutes.js]: Unauthorized: No userId found`);
            return res.status(401).json({ message: `Unauthorized: No userId found` })
        }

        const user = await User.findById(userId).select('-password').exec();
        if (!user) {
            console.error('[ERROR: userRoutes.js]user not found');
            return res.status(404).json({ message: 'User not found' })
        }

        console.log('[SUCCESS: userRoutes.js] [GET /users/me] User Details:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('[ERROR: userRoutes.js] Error fetching user', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})


//Route to GET all users
//Send a GET request to the /users/findUsers endpoint
router.get('/findUsers', checkJwtToken, async (req, res) => {
    try {
        const { email, contactNumber, username } = req.query;

        const query = {};
        if (email) query['contactDetails.email'] = String(email).trim().toLowerCase();
        if (contactNumber) query['contactDetails.contactNumber'] = contactNumber;
        console.log(`[INFO: userRoutes.js, /findUsers]: ${query}`);

        const users = await User.find(query).select('-password').exec();

        console.log('[INFO: userRoutes.js]:', users);
        console.log('[INFO: userRoutes.js] findUsers count:', users.length);
        return res.status(200).json(users);

    } catch (error) {
        console.error('[ERROR: userRoutes.js]: Error fetching users', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;

