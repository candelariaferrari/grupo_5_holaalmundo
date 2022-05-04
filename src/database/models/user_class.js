// CREO Y EXPORTO EL MODELO

module.exports = function(sequelize, dataTypes) 
{
let alias = 'User_Class'

let cols = 
{
idUsuarios_Clases: {
                    type: dataTypes.BIGINT(10).UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                   },
id_user: {
          type: dataTypes.INTEGER,
          allowNull: false
         },
id_class: {
           type: dataTypes.INTEGER,
           allowNull: false
          }
}

let config = {
              timestamps: false,
             }

const User_Class = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 

/*
User_Class.associate = function(models)
{
User_Class.hasMany(models.User, {as: "users",
                                 foreignKey: "id_user"})

User_Class.hasMany(models.Class, {as: "classes",
                                  foreignKey: "id_class"})
}
*/

return User_Class

};
