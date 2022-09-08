const statusCodes = {};

statusCodes[(exports.OK = 200)] = 'OK';
statusCodes[(exports.CREATED = 201)] = 'Created';
statusCodes[(exports.ACCEPTED = 202)] = 'Accepted';
statusCodes[(exports.NO_CONTENT = 204)] = 'No Content';
statusCodes[(exports.BAD_REQUEST = 400)] = 'Bad Request';
statusCodes[(exports.UNAUTHORIZED = 401)] = 'Unauthorized';
statusCodes[(exports.FORBIDDEN = 403)] = 'Forbidden';
statusCodes[(exports.NOT_FOUND = 404)] = 'Not Found';
statusCodes[(exports.METHOD_NOT_ALLOWED = 405)] = 'Method Not Allowed';
statusCodes[(exports.UNSUPPORTED_MEDIA_TYPE = 415)] = 'Unsupported Media Type';
statusCodes[(exports.UNPROCESSABLE_ENTITY = 422)] = 'Unprocessable Entity';
statusCodes[(exports.INTERNAL_SERVER_ERROR = 500)] = 'Server Error';

exports.getStatusText = function (statusCode) {
    if (Object.prototype.hasOwnProperty.call(statusCodes, statusCode)) {
        return statusCodes[statusCode];
    } else {
        throw new Error('Status code does not exist: ' + statusCode);
    }
};

exports.getStatusCode = function (reasonPhrase) {
    for (const key in statusCodes) {
        if (statusCodes[key] === reasonPhrase) {
            return parseInt(key, 10);
        }
    }
    throw new Error('Reason phrase does not exist: ' + reasonPhrase);
};
