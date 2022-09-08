const koaPassport = require('koa-passport');
const { isEmpty: _isEmpty } = require('lodash');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../data/models');
const config = require('../config');

const jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.JWT_SECRET };

koaPassport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findOne({ where: { id: payload.id } });

            if (_isEmpty(user) || user.accessTokenSalt !== payload.salt) {
                return done(null, null);
            }

            done(null, user);
        } catch (e) {
            done(e, null);
        }
    })
);

module.exports = koaPassport.authenticate('jwt', { session: false });
