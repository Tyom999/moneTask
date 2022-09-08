const Router = require('koa-router');

const router = new Router({ prefix: '/v1' });

router.use(require('./user').routes());

module.exports = router;
