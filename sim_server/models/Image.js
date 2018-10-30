module.exports = (sequelize, DataTypes) => {
    return sequelize.define('image', {
        idImage: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    });
};
