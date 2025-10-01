require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/userSchema');
const { checkJwtToken, checkAge, checkPassword, handleFindUsers } = require('./middleware');

const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';
const expirationTime = process.env.JWT_EXPIRATION || '12';
const jwtAlgorithm = process.env.JWT_ALGORITHM || 'HS256';

if (!secretKey) {
    console.warn("[WARNING: userRoute.js]: JWT_SECRET_KEY not set. Using fallback key.");  
}
else if (!expirationTime) {
    console.warn('[WARNING: userRoute.js] Missing exiration time, using fallback time')
}
else if (!jwtAlgorithm) {
    console.warn('[WARNING: userRoute.js] Missing jwt algorithm, using fallback algorithm.');
}

//===============ROUTES=======================
//-------------GET--------------------------
router.get('/me', checkJwtToken, async (req, res) => {
    try {
        const userId = req.user?.userId;

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
router.get('/findUsers', checkJwtToken, handleFindUsers,async (req, res) => {
    try {
        const { email, contactNumber, username } = req.query;

        const query = {};
        if (email) query['contactDetails.email'] = String(email).trim().toLowerCase();
        if (contactNumber) query['contactDetails.contactNumber'] = String(contactNumber).trim();
        if (username) query.username = String(username).trim();

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

//-----------------POST----------------------------
router.post('/login', async (req,res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            console.error('[ERROR: userRoutes.js , /login] Email and password are required');
            return res.status(400).json({ message: 'Email and password are required' });
        }


        const user = await User.findOne({ username: String(username).trim() }).select('+password').exec();

        if (!user) {
            console.error('[ERROR: userRoutes.js] User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Conditional rendering to check user credentials
        if (password !== user.password) {
            console.error('[ERROR: userRoutes.js] Incorrect password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const jwtToken = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.admin,
                fullName: user.fullName
            },
            secretKey,
            {
                expiresIn: expirationTime,
                algorithm: jwtAlgorithm
            }
        )
        const safeUser = await User.findById(user._id).select('-password').exec();
        console.log('[SUCCESS: userRoutes.js /login] User logged in:', safeUser.username);

        return res.status(200).json({
            token: jwtToken,
            user: safeUser,
        });
    } catch (error) {
        console.error('[ERROR: userRoutes.js /login]', error.message);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

router.post('/register', checkAge, checkPassword, async (req, res) => {
    console.log(req.body);
    try {
        // Extract incoming data from the request body
        const {
            username,
            companyName,
            position,
            fullName = {},
            contactDetails = {},
            dateOfBirth,
            password,
        } = req.body || {};

        const { firstName, lastName } = fullName || {};
        const { email, contactNumber } = contactDetails || {};

        // 2) Collect missing fields early for a friendly 400
        const missingFields = [];
        if (!username) missingFields.push('Username')
        if (!companyName) missingFields.push('Company Name')
        if (!position) missingFields.push('position')    
        if (!firstName) missingFields.push('First Name');
        if (!lastName) missingFields.push('Last Name');
        if (!email) missingFields.push('Email');
        if (!contactNumber) missingFields.push('Contact Number');
        if (!password) missingFields.push('Password');

        if (missingFields.length > 0) {
            console.error('[ERROR /register] Missing fields:', missingFields);
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided.',
                missingFields,
            });
        }


        //3) Normalize inputs
        const normalized = {
            username: String(username).trim(),
            companyName: String(companyName).trim(),
            email: String(email).trim().toLowerCase(),
            contactNumber: String(contactNumber).trim(),
            firstName: String(firstName).trim(),
            lastName: String(lastName).trim(),
            password: String(password), 
            dateOfBirth, // allow Mongoose to parse Date; frontend should send YYYY-MM-DD
        };

        // 4) Enforce allowed positions; default to viewer
        const allowedPositions = ['manager', 'admin', 'clerk', 'viewer'];
        const safePosition = allowedPositions.includes(position) ? position : 'viewer';

        // Check if a user already exists with the same username, email or contact number
        const existingUser = await User.findOne({
            $or: [
                { username: normalized.username },
                { 'contactDetails.email': normalized.email },
                { 'contactDetails.contactNumber': normalized.contactNumber },
            ],
        }).select('username contactDetails.email contactDetails.contactNumber').lean();
        //conditional rendering to check if user already exists
        console.log('[DEBUG: userRoutes.js, /register] Existing user:', existingUser);
        if (existingUser) {
            let conflictField = 'username/email/contactNumber';
            if (existingUser.username === normalized.username) conflictField = 'username';
            else if (existingUser?.contactDetails?.email === normalized.email) conflictField = 'email';
            else if (existingUser?.contactDetails?.contactNumber === normalized.contactNumber) conflictField = 'contactNumber';

            console.error(`[ERROR /register] Duplicate ${conflictField}`);
            return res.status(409).json({
                success: false,
                message: `A user with this ${conflictField} already exists.`,
                conflictField,
            });
        }
        const isAdmin = (safePosition === 'admin' || safePosition === 'manager');


        // ---- Create user ----
        const newUser = new User({
            username: normalized.username,
            companyName: normalized.companyName,
            position: safePosition,
            fullName: { firstName: normalized.firstName, lastName: normalized.lastName },
            contactDetails: {
                email: normalized.email,
                contactNumber: normalized.contactNumber,
            },
            dateOfBirth, // rely on schema validation/format
            password: normalized.password, 
            admin: isAdmin,
        });



        const savedUser = await newUser.save();
        console.log('[INFO: userRoutes.js, /register] New user saved:', savedUser);

        // Generate JWT Token
        // Generate JWT with same env-driven config as login
        const token = jwt.sign(
            {
                userId: savedUser._id,
                fullName: savedUser.fullName,
                isAdmin: !!savedUser.admin,
            },
            secretKey,
            {
                expiresIn: expirationTime,
                algorithm: jwtAlgorithm,
            }
        );
        console.log('[INFO /register] Created user:', savedUser.username);
        return res.status(201).json({
            success: true,
            token,
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                fullName: savedUser.fullName,
                companyName: savedUser.companyName,
                position: savedUser.position,
                admin: !!savedUser.admin,
                contactDetails: savedUser.contactDetails,
                dateOfBirth: savedUser.dateOfBirth,
            },
        });
    } catch (error) {
        console.error('[ERROR: userRoutes.js, /register]', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

//------------------------------------------
//Route to edit a user
//Send a put request to the /editUser/:id endpoint
router.put('/editUser/:id', checkJwtToken, async (req, res) => {
    try {
        const userId = req.params.id;

        const { username, fullName = {}, companyName, contactDetails = {} } = req.body;
        const { firstName, lastName } = fullName;
        const { email, contactNumber } = contactDetails;

        const updates = {}
        if (typeof username === 'string' && username.trim() !== '') {
            updates['userName'] = username.trim();
        }
        if (typeof firstName === 'string' && firstName.trim() !== '') {
            updates['fullName.firstName'] = firstName.trim();
        }
        if (typeof lastName === 'string' && lastName.trim() !== '') {
            updates['fullName.lastName'] = lastName.trim();
        }
        if (typeof companyName === 'string' && companyName.trim() !== '') {
            updates['companyName'] = companyName.trim();
        }
        if (typeof email === 'string' && email.trim() !== '') {
            updates['contactDetails.email'] = email.trim().toLowerCase();
        }
        if (typeof contactNumber === 'string' && contactNumber.trim() !== '') {
            // keep raw; your schema validator will enforce format
            updates['contactDetails.contactNumber'] = contactNumber.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No valid fields supplied to update.' });
        }

        if (updates['contactDetails.email'] || updates['contactDetails.contactNumber']) {
            const dup = await User.findOne({
                _id: { $ne: userId },
                $or: [
                    updates['contactDetails.email']
                        ? { 'contactDetails.email': updates['contactDetails.email'] }
                        : null,
                    updates['contactDetails.contactNumber']
                        ? { 'contactDetails.contactNumber': updates['contactDetails.contactNumber'] }
                        : null,
                ].filter(Boolean),
            }).exec();

            if (dup) {
                return res.status(409).json({ message: 'Email or contact number already in use.' });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true, context: 'query' }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        console.log('[DATA: userRoutes.js,/editUser/:id ] updated user:', updatedUser);

        return res.json({ message: 'User updated successfully', updatedUser, });
    } catch (error) {
        console.error('[ERROR: userRoutes.js,/editUser/:id] Error updating user:', error.message);
        res.status(500).json({ error: 'Server error while updating user' });
    }
})

//Route to edit a user password
//Send a put request to the /editPassword endpoint
router.put('/editPassword', checkPassword, checkJwtToken, async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body || {};

        if (!currentPassword || !newPassword) {
            return res.status(400).json({message: 'Current password and new password are required'})
        }

        const user = await User.findById(req.user.userId).select('+password').exec();
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.password !== currentPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from old password' });
        }
        // Update password (plaintext) and save
        user.password = newPassword;
        await user.save();
    } catch (error) {
        console.error('[ERROR userRoutes.js] /editPassword:', err.message);;//Log an error message in the console for debugging purposes
        return res.status(500).json({ message: 'Internal Server error' });
    }
    
})

//--------------------DELETE-----------------------------
//Route to delete a user
// Route to send a DELETE request to deleteUser/:id
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const removedUser = await User.findById(id)

        if (!removedUser) {
            return res.status(404).json({ message: 'User Not found' })
        }

        console.log(`[DATA: userRoutes.js , /deleteUser/:id]: ${removedUser}`);

        res.json({ message: 'User Successfully deleted', deletedUserId: removedUser._id })
    } catch (error) {
        console.error('[ERROR: userRoutes.js /deleteUser]Error deleting user:', error.message);//Log an error message in the console for debugging purposes
        res.status(500).json({ error: 'Failed to delete User' });
    }
})
//Export the userRouter
module.exports = router;

