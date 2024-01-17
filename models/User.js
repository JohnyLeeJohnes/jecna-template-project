const {Sequelize} = require("sequelize");
module.exports    = (sequelize) => {
    return sequelize.define("User", {
        username: {
            type:      Sequelize.DataTypes.STRING,
            allowNull: false,
            validate:  {
                notEmpty: true,
            }
        },
        email:  {
            type:      Sequelize.DataTypes.STRING,
            allowNull: false,
            validate:  {
                notEmpty: true,
            }
        },
        password:       {
            type:      Sequelize.DataTypes.STRING,
            allowNull: false,
            validate:  {
                notEmpty: true,
            },
        }
    });
}
