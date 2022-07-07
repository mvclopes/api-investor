const jwt = require('jsonwebtoken');
const cfg = require('../config/cfg');

const createUserToken = (investor) => {
    return jwt.sign(
        {
            apikey: investor.apikey, 
            fullname: investor.fullname,
            username: investor.username, 
            email: investor.email
        }, 
        process.env.SECRET, 
        {expiresIn: cfg.jwt_expires}
    );
};

module.exports = createUserToken;
