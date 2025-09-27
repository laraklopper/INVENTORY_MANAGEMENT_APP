/* Load environment variables from a .env 
file using the dotenv package*/
require('dotenv').config();
// Import required modules and packages
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Resolve .env path relative to project root
let envFilePath = path.join(process.cwd(), './env');