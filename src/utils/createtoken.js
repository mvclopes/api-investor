const jwt = require('jsonwebtoken');
const cfg = require('../config/cfg');

const createUserToken = (apikey, username, email) => {
    return jwt.sign({apikey: apikey, username: username, email: email}, process.env.SECRET, {expiresIn: cfg.jwt_expires});
};

module.exports = createUserToken;
