
module.exports = function(sequelize, Sequelize) {
  var Bucketlist = sequelize.define("Bucketlist", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    info: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [1,300]
      }
    },
    body: {
      type:Sequelize.JSON,
      allowNull:true,
      defaultValue:null

    },
    completed :{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  });

  Bucketlist.associate = function(models) {
    Bucketlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bucketlist;
};
