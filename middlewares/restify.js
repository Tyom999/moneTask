const compose = require('koa-compose');
const respond = require('koa-respond');

const { HttpStatus } = require('../constants');
const errorHandler = require('./errorHandler');
const negotiator = require('./negotiator');

module.exports = () =>
    compose([
        respond({
            statusMethods: {
                ok: HttpStatus.OK,
                created: HttpStatus.CREATED,
                accepted: HttpStatus.ACCEPTED,
                noContent: HttpStatus.NO_CONTENT,
                unprocessableEntity: HttpStatus.UNPROCESSABLE_ENTITY,
                unsupportedMediaType: HttpStatus.UNSUPPORTED_MEDIA_TYPE
            }
        }),
        errorHandler(),
        negotiator()
    ]);
