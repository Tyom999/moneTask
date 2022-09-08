const bcrypt = require('bcrypt');
const stream = require('stream');
const { isObject: _isObject, isFunction: _isFunction } = require('lodash');

class Security {
    /**
     * @param password
     * @return {Promise<*>}
     */
    generatePasswordHash(password) {
        return bcrypt.hash(password, 10);
    }

    /**
     * @param currentPassword
     * @param password
     * @return {*}
     */
    validatePassword(currentPassword, password) {
        return bcrypt.compare(currentPassword, password);
    }

    /**
     * @param obj
     * @return Boolean
     */
    isReadableStream(obj) {
        return obj instanceof stream.Stream && _isFunction(obj._read) && _isObject(obj._readableState);
    }
}

module.exports = new Security();
