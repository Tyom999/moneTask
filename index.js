const app = new (require('koa'))();
const koaBody = require('koa-body');

const config = require('./config');

const v1Routes = require('./routes/v1');

app.use(require('@koa/cors')());
app.use(koaBody({ multipart: true }));
app.use(require('./middlewares/restify')());

app.use(v1Routes.routes());
app.use(v1Routes.allowedMethods());

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
});
