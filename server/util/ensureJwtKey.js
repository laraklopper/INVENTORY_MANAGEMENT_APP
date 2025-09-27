/* Load environment variables from a .env 
file using the dotenv package*/
require('dotenv').config();
// Import required modules and packages
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Resolve .env path relative to project root
let envFilePath = path.join(process.cwd(), './env');

function ensureEnvHasKey(content, keyLine) {
    const hasKey = /(^|\r?\n)JWT_SECRET_KEY\s*=/.test(content);
    if (!hasKey) {
        // Add key line if not found
        return content + (content.endsWith('\n') ? '' : '\n') + keyLine;
    }
    // Replace if value is empty or whitespace
    return content.replace(
        /(^|\r?\n)JWT_SECRET_KEY\s*=\s*(?:\r?\n|$)/,
        `${process.platform === 'win32' ? '\r\n' : '\n'}${keyLine}`
    )
}

function ensureJwtSecret({ failIfMissingInProd = true } = {}) {
    const nodeEnv = (process.env.NODE_ENV || 'development').toLowerCase();
    let jwtKey = (process.env.JWT_SECRET_KEY || '').trim();

    if (jwtKey) {
        return jwtKey; // Already set
    }

    if (nodeEnv === 'production' && failIfMissingInProd) {
        console.error('[FATAL] JWT_SECRET_KEY is missing in production. Set it in the environment or .env.');
        process.exit(1);
    }

    // Generate a 64-byte (512-bit) random key
    jwtKey = crypto.randomBytes(64).toString('hex');
    const jwtSecretLine = `JWT_SECRET_KEY=${jwtKey}\n`;

    // Save to .env (append or replace)
    if (fs.existsSync(envFilePath)) {
        const envContent = fs.readFileSync(envFilePath, 'utf-8');
        const updated = ensureEnvHasKey(envContent, jwtSecretLine.trim());
        if (updated !== envContent) {
            fs.writeFileSync(envFilePath, updated, { mode: 0o600 });
            console.log('[INFO] JWT secret key saved to .env');
        }
    } else {
        fs.writeFileSync(envFilePath, jwtSecretLine, { mode: 0o600 });
        console.log('[INFO] .env created and JWT secret key added');
    }

    // Make available for this process
    process.env.JWT_SECRET_KEY = jwtKey;
    return jwtKey;
}

module.exports = ensureJwtSecret;