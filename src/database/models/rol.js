// CREO Y EXPORTO EL MODELO 

module.exports = function(sequelize, dataTypes) 
{
let alias = 'Rol'

let cols = 
{
idRol: {
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
       },
description: {
              type: dataTypes.STRING,
              allowNull: false
             }
}

let config = {
              tableName: "Rol",
              timestamps: false,
             }

const Rol = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 

Rol.associate = function(models)
{
Rol.hasMany(models.User, {as: "users",
                          foreignKey: "rol_id"})
}

return Rol

};
