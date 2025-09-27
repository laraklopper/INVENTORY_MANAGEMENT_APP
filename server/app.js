require('dotenv').config();
const ensureJwtSecret = require('./util/ensureJwtKey')
ensureJwtSecret();

const express = require('express');

const app = express()

