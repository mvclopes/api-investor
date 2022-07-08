require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const buildUpdateBankInfo = (req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers['token'];
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) reject(err);

            const updateBankInfoRequest = {
                id: req.body.id,
                bankInfo: {
                    bankname: req.body.bankInfo.bankname,
                    accounttype: req.body.bankInfo.accounttype,
                    holdername: data.fullname,
                    limitcard: req.body.bankInfo.limitcard,
                    apikey: data.apikey
                }
            }
            resolve(updateBankInfoRequest);
        });
    });
}

module.exports = buildUpdateBankInfo;