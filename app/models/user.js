
module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('user', {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    username: {type:Sequelize.TEXT},
    email: { type:Sequelize.STRING, validate: {isEmail:true} },
    password : {type: Sequelize.STRING,allowNull: false }, 
});

    User.associate = function(models) {
     User.hasMany(models.bucketlist, {
      onDelete: "cascade"
    });
  };

  return User;

}