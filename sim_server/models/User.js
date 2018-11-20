module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        avatar: {
            type: DataTypes.STRING(),
            allowNull: false
        }
    });
};
