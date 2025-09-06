const crypto = require('crypto');

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('Generated JWT Secret:');
console.log(jwtSecret);
console.log('\nCopy this secret to your .env file as JWT_SECRET value');

module.exports = jwtSecret;
