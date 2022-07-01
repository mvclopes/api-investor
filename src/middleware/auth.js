require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.token;
    console.log('token',token);
    if (!token) res.status(401).send({output: 'Not authorized'});
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) res.status(401).send({output: 'Invalid token'});
        console.log('data: ',Object.keys(data));
    });
    next();
};

module.exports = auth;