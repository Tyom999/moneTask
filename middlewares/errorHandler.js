const { get: _get, isEmpty: _isEmpty, snakeCase: _snakeCase } = require('lodash');

const { ErrorType, HttpStatus } = require('../constants');

module.exports = () => async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        let exceptions = [];
        const { VALIDATION_ERROR_NAMES, AGGREGATE_ERROR } = ErrorType;

        if (e.name === AGGREGATE_ERROR) {
            for (const err of _get(e, 'errors')) {
                exceptions.push(...err.errors.errors);
            }
        } else if (VALIDATION_ERROR_NAMES.includes(e.name)) {
            exceptions = _isEmpty(e.errors) ? [e.original] : e.errors;
        }

        if (!_isEmpty(exceptions)) {
            const errors = [];

            if (e && !_isEmpty(exceptions)) {
                for (const err of Object.values(exceptions)) {
                    const message = err.kind === 'user defined' ? err.message : err.kind || err.message;

                    errors.push({ field: err.path || err.constraint, message: _snakeCase(`err_${message.toLocaleLowerCase()}`) });
                }
            }

            ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;

            return (ctx.body = {
                statusName: HttpStatus.getStatusText(ctx.status),
                message: 'ValidationError',
                statusCode: ctx.status,
                errors
            });
        }

        console.error(e);

        ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
        ctx.body = { statusName: HttpStatus.getStatusText(ctx.status), statusCode: ctx.status };
    }
};
