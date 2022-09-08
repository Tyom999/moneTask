const jwt = require('jsonwebtoken');

const config = require('../config');

class JWT {
    /**
     * @param data
     * @return String
     */
    async sign(data) {
        return jwt.sign(data, config.JWT_SECRET);
    }
}

module.exports = new JWT();
