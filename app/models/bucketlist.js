
module.exports = function(sequelize, Sequelize) {
  var Bucketlist = sequelize.define("bucketlist", {
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
    Bucketlist.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bucketlist;
};
