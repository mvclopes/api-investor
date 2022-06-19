const jwt = require('jsonwebtoken');
const cfg = require('../config/cfg');

const createUserToken = (userId, username, email) => {
    return jwt.sign({id: userId, username: username, email: email}, process.env.SECRET, {expiresIn: cfg.jwt_expires});
};

module.exports = createUserToken;
