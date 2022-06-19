const bcrypt = require('bcrypt');
const cfg = require('../config/cfg');

const generateHash = async (password) => {
    try {
        return await bcrypt.hash(password, cfg.salt);
    } catch (err) {
        console.error(`error: ${err}`);
    }
};

module.exports = generateHash;