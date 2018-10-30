const Sequelize = require('sequelize');
const config = require('config').database;

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
    define: {
        freezeTableName: true
    },
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
            name: 'idUser',
            allowNull: false
        },
        onDelete: 'CASCADE'
    });
    m.Image.belongsTo(m.User, {
        foreignKey: {
            name: 'idUser',
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