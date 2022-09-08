const { isEmpty: _isEmpty } = require('lodash');

const { ErrorMessages } = require('../constants');
const { User } = require('../data/models');

class UserHandler {
    async create(ctx) {
        const { firstName, lastName, email, password } = ctx.request.body;

        await User.create({ firstName, lastName, email, password });

        return ctx.created();
    }

    async login(ctx) {
        const { email, password } = ctx.request.body;

        const user = await User.findOne({ where: { email } });

        if (_isEmpty(user) || !(await user.comparePassword(password))) {
            return ctx.notFound(ErrorMessages.INVALID_CREDENTIALS);
        }

        return ctx.ok({ token: await user.generateToken() });
    }

    async findOne(ctx) {
        const { id } = ctx.params;
        const { id: currentUserId } = ctx.state.user;
        const userId = id === 'me' ? currentUserId : id;

        const user = await User.findByPk(userId);

        if (_isEmpty(user)) {
            return ctx.notFound(ErrorMessages.USER_NOT_FOUND);
        }

        return ctx.ok({ data: user });
    }
}

module.exports = new UserHandler();
