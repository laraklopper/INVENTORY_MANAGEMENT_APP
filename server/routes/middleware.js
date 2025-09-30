require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';
if (!process.env.JWT_SECRET_KEY) {
    console.warn('[WARNING: middleware.js] JWT_SECRET_KEY not set. Using fallback key (INSECURE FOR PRODUCTION).');
}


//Middleware function to check and verify a JWT token from the 'token' header
const checkJwtToken = (req, res, next) => {
    console.log('[DEBUG: middleware.js] [checkJwtToken] Middleware triggered');
    try {
        let authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.warn('[WARN: middleware.js ,checkJwtToken] Authorization header missing or malformed');
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            console.warn('[WARN: middleware.js, checkJwtToken] Token is empty after split');
            return res.status(401).json({ message: 'Access denied. No token provided.' })
        }

        const decoded = jwt.verify(token, secretKey)
        req.user = decoded;

        next()


    } catch (error) {
        console.error('[ERROR: middleware.js] No token attatched to the request', error.message);
        return res.status(400).json({ message: 'Invalid token.' });
    
    }
}
const handleFindUsers = async (req, res) => {
    try {
        const { email, contactNumber, username } = req.query;
        const query = {};
        if (email) query['contactDetails.email'] = String(email).trim().toLowerCase();
        if (contactNumber) query['contactDetails.contactNumber'] = String(contactNumber).trim();
        if (username) query.username = String(username).trim();

        const users = await User.find(query).select('-password').exec();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const checkPassword = (req, res, next) => {
    console.log('[DEBUG: middleware.js checkPassword] Middleware triggered');
    try {
        const { password } = req.body || {};

        console.log('[DEBUG: checkPassword] Password provided (boolean):', Boolean(password));

        if (typeof password !== 'string' || password.length === 0) {
            console.error('[ERROR: middleware.js, checkPassword]: Missing Password');
            return res.status(400).json({ message: 'Password is required.' });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.error('[ERROR: middleware.js, checkPassword] Invalid password');
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and contain one special character.'
            });
        }
        return next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal error validating password.' });
    }
}
const checkAge = (req, res, next) =>{
    console.log('[DEBUG: checkAge] Middleware triggered');
    try {
        const { dateOfBirth } = req.body || {};
        console.log('[DEBUG: checkAge] Received date of birth:', dateOfBirth);

        if (!dateOfBirth) {
            console.error('[ERROR: checkAge] Date of Birth is required');
            return res.status(400).json({ error: 'Date of Birth is required' });
        }

        const dob = new Date(dateOfBirth);
        if (Number.isNaN(dob.valueOf())) {
            console.error('[ERROR: checkAge] Invalid Date of Birth format');
            return res.status(400).json({ error: 'Invalid Date of Birth' });
        }
        // Prevent future dates
        if (dob > new Date()) {
            console.error('[ERROR: checkAge] DOB is in the future');
            return res.status(400).json({ error: 'Invalid Date of Birth' });
        }

        // 365.25 days per year (approx), in ms
        const years = Math.floor((Date.now() - dob.getTime()) / 31557600000);
        console.log(`[INFO: checkAge] User age calculated as: ${years}`);

        if (years < 18) {
            return res.status(400).json({ error: 'User must be 18 or older' });
        }
        return next();
  
    } catch (error) {
        console.error('[ERROR: middleware.js, checkAge]: Internal error validating age');
        return res.status(500).json({ error: 'Internal error validating age' });
    }
}

module.exports = {checkJwtToken, checkPassword, checkAge, handleFindUsers};
