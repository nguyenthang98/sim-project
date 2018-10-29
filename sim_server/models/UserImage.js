module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_image', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idImage: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });
};
