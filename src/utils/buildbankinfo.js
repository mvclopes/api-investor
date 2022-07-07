require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const buildBankInfo = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers['token'];
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) reject(err);
            const newBankInfo = {
                bankname: req.body.bankname,
                accounttype: req.body.accounttype,
                holdername: data.fullname,
                limitcard: req.body.limitcard,
                apikey: data.apikey
            }
            resolve(newBankInfo);
        });
    });
}

module.exports = buildBankInfo;