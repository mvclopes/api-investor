require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) res.status(401).send({output: 'Not authorized'});
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) res.status(401).send({output: 'Invalid token'});
    });
    next();
};

module.exports = auth;