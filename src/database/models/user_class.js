module.exports = (sequelize, dataTypes) => {
    let alias = 'User_Class'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        id_user_fk: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_class_fk: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "User_Class",
        timestamps: false,
    }

    const User_Class = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    /*User_Class.associate = function(models){
        User_Class.hasMany(models.User, {
            as: "users",
            foreignKey: "id_user"
        });
        User_Class.hasMany(models.Class, {
            as: "classes",
            foreignKey: "id_class"
        });
    }*/

    return User_Class;

};