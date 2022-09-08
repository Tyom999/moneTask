const Router = require('koa-router');

const { create, login, findOne } = require('../../handlers/UserHandler');
const auth = require('../../middlewares/auth');

const router = new Router({ prefix: '/users' });

router.get('/:id', auth, findOne);

router.post('/', create);
router.post('/login', login);

module.exports = router;
