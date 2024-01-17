const crypto = require("crypto");

const hashPassword = (password) => {
    if(!password) return "";
    return crypto.pbkdf2Sync(password, '0x00', 1000, 64, "sha512").toString("hex");
};

const validatePassword = (password, hash) => {
    return hashPassword(password) === hash;
};

module.exports = {hashPassword, validatePassword};