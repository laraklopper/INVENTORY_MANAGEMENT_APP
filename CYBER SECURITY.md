# SECURITY

## TABLE OF CONTENTS
1. [THREATS](#threats)
2. [SECURITY MIDDLEWARE](#security-middleware)
3. [REFERENCES](#references)

## THREATS
### **CLIENT-SIDE**
- **CROSS SITE SCRIPTING (`XSS`) (script injection)**: steals access tokens (if in memory) or CSRF tokens, performs actions as the user.
- **Token exposure:** storing tokens in `localStorage/sessionStorage`; leaking in URLs or error logs.
- **Cross-Site Request Forgery (`CSRF`)(when you rely on cookies):** : When the browser auto-sends cookies cross-site.
- **Clickjacking**: hidden iframes trick users into clicking destructive actions.
- **Mixed content / missing CSP**: insecure assets enable injection or token leakage.
- **Malicious extensions:** can read in-page JS memory (incl. access tokens).
- **Open redirects (front-end routes):** abused during login/reset.

### **SERVER-SIDE**
* **Broken auth & token handling:** weak JWT secrets, long-lived ATs, no RT rotation, no revocation, missing `exp/iss/aud` checks.
* **Cross-Site Request Forgery (`CSRF`) (with cookies):** no token/origin checks on POST/PUT/PATCH/DELETE.
* **CROSS-ORIGIN-RESOURCE-SHARING (`CORS`) misconfig:**  with `credentials: true`, or reflecting arbitrary `Origin`.
* **Broken access control / IDOR:** missing ownership/role/tenant checks.
* **Multi-tenant leaks:** not filtering by `companyName`/tenant on every query.
* **NoSQL injection / mass assignment:** passing unvalidated objects into queries or `Model.create({...req.body})`.
* **Brute force & user enumeration:** noisy login endpoints with distinct error messages.
* **Sensitive data in logs:** tokens/PII ending up in logs or crash reports.
* **Unpatched deps / supply chain:** vulnerable libs, typosquatted packages.

## SECURITY MIDDLEWARE
1. **helmet** — secure HTTP headers (CSP, HSTS, noSniff, frameguard)

```bash
npm i helmet
```

2. **cors** — strict allow-list for front-end origins; controls cross-origin reads

```bash
npm i cors
```

3. **cookie-parser** — parses cookies (needed for CSRF cookie mode)

```bash
npm i cookie-parser
```

4. **csurf** — CSRF protection (use cookie mode alongside `cookie-parser`)

```bash
npm i csurf
```

5. **express-rate-limit** — throttles auth/sensitive endpoints (anti-bruteforce)

```bash
npm i express-rate-limit
```

6. **express-mongo-sanitize** — blocks `$`/`.` operator injection in Mongo queries

```bash
npm i express-mongo-sanitize
```

7. **hpp** — prevents HTTP Parameter Pollution (duplicate query/body keys)

```bash
npm i hpp
```

8. **Input validation middleware** — whitelist & validate every request

```bash
npm i zod
# or
npm i express-validator
# or
npm i joi celebrate
```

## Auth & crypto _(not middleware, but essential)_

* **jsonwebtoken** — sign/verify JWTs 

```bash
npm i jsonwebtoken
```

* **bcrypt** or **argon2** — password hashing

```bash
npm i bcrypt
# or
npm i argon2
```

## Minimal wiring (safe defaults & order)

```js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

const allowed = new Set(['http://localhost:5173','https://app.example.com']);
app.use(cors({
  origin(origin, cb){ if(!origin || allowed.has(origin)) return cb(null,true); cb(new Error('CORS blocked')); },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization','X-CSRF-Token'],
  maxAge: 600,
}));

app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

// Sanitize & harden request parsing
app.use(hpp());
app.use(mongoSanitize({ replaceWith: '_' }));

// Rate limit sensitive paths
app.use('/auth/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api/',  rateLimit({ windowMs: 60 * 1000,      max: 600 }));

// CSRF (cookie mode). Expose a token endpoint; then protect mutating routes.
const csrfProtection = csrf({
  cookie: { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/' }
});
app.get('/auth/csrf', csrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { sameSite: 'lax', secure: isProd });
  res.json({ csrfToken: req.csrfToken() });
});
app.use(['/auth','/api'], csrfProtection); // GET/HEAD/OPTIONS are ignored by csurf
```

## REFERENCES

- https://www.geeksforgeeks.org/ethical-hacking/what-is-cross-site-scripting-xss/
- https://www.geeksforgeeks.org/computer-networks/what-is-cross-site-request-forgery-csrf/

