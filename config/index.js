require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    db: {
        host: process.env.RDS_HOST,
        database: process.env.RDS_DB,
        dialect: process.env.RDS_DIALECT,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD
    }
};
