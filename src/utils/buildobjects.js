require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const updateBankInfo = (req) => {
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

const bankInfo = (req) => {
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

const build = { bankInfo, updateBankInfo };

module.exports = build;