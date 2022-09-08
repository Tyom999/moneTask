const { Model, DataTypes } = require('sequelize');
const { trim: _trim, omit: _omit } = require('lodash');

const { Jwt, Security, Util } = require('../../components');

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
                firstName: { type: DataTypes.STRING(50), allowNull: false },
                lastName: { type: DataTypes.STRING(50), allowNull: false },
                email: { type: DataTypes.STRING, allowNull: false, unique: true },
                password: { type: DataTypes.STRING, allowNull: false },
                accessTokenSalt: { type: DataTypes.STRING }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'user',
                hooks: { beforeSave: User.hookBeforeSave },
                setterMethods: {
                    firstName(value) {
                        this.setDataValue('firstName', _trim(value) || null);
                    },
                    lastName(value) {
                        this.setDataValue('lastName', _trim(value) || null);
                    },
                    email(value) {
                        this.setDataValue('email', value ? _trim(value) : null);
                    },
                    password(value) {
                        this.setDataValue('password', value || null);
                    }
                }
            }
        );
    }

    static async hookBeforeSave(user) {
        if (user.isNewRecord || user.changed('password')) {
            user.accessTokenSalt = Util.generateRandomString(6);
            user.password = await Security.generatePasswordHash(user.password);
        }
    }

    comparePassword(currentPassword = '') {
        return Security.validatePassword(currentPassword, this.password);
    }

    async generateToken() {
        return { type: 'jwt', access: await Jwt.sign({ salt: this.accessTokenSalt, id: this.id }) };
    }

    toJSON() {
        const model = this.get();
        const hiddenFields = ['password', 'accessTokenSalt'];

        return _omit(model, hiddenFields);
    }
}

module.exports = User;
