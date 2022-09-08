const path = require('path');
const { readdirSync } = require('fs');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../../config');

const sequelize = new Sequelize(config.db);

const models = Object.assign(
    {},
    ...readdirSync(__dirname)
        .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
        .map(file => {
            const model = require(path.join(__dirname, file));
            return { [model.name]: model.init(sequelize) };
        })
);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
