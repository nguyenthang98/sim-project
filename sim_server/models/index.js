const Sequelize = require('sequelize');
const config = require('config').database;

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
    logging: config.logging,
    dialect: config.dialect,
    port: config.port
});

const Op = Sequelize.Op;
const db = {};

sequelize
    .sync()
    .then(() => {
        console.log('SYNC DATABASE SUCCESSFULLY');
    })
    .catch(err => {
        console.log(err);
    });

var models = ['User', 'UserImage', 'Image'];

models.forEach(model => {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(m => {
    m.User.hasMany(m.Image, {
        foreignKey: {
            name: 'username',
            allowNull: false
        },
        onDelete: 'CASCADE'
    });
    m.Image.belongsTo(m.User, {
        foreignKey: {
            name: 'username',
            allowNull: false
        }
    });
    m.User.belongsToMany(m.Image, {
        through: {
            model: m.UserImage
        },
        foreignKey: 'idUser'
    });
})(module.exports);

module.exports.sequelize = sequelize;
