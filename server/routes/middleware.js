require('dotenv').config();
const jwt = require('jsonwebtoken');

let secretKey = process.env.JWT_SECRET_KEY || 'secretKey';

if (!secretKey) {
    console.warn("[WARNING: middleware.js] JWT_SECRET_KEY not set. Using fallback key.");
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

module.exports = {checkJwtToken};
