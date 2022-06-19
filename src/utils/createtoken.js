const jwt = require('jsonwebtoken');

const createUserToken = (userId, username, email) => {
    return jwt.sign({id: userId, username: username, email: email}, process.env.SECRET, {expiresIn: '7d'});
};

module.exports = createUserToken;
