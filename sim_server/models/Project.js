module.exports = (sequelize, DataTypes) => {
  return sequelize.define('project', {
    idProject: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectInfo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
