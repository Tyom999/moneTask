const randomString = require('randomstring');

class Util {
    /**
     * @param length
     * @return String
     */
    generateRandomString(length = 32) {
        return randomString.generate({ length, charset: 'alphabetic' });
    }
}

module.exports = new Util();
