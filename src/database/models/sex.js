// CREO Y EXPORTO EL MODELO 

module.exports = function(sequelize, dataTypes) 
{
let alias = 'Sex'

let cols = 
{
idSex: {
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
              tableName: "Sex",
              timestamps: false,
             }

const Sex = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 

Sex.associate = function(models)
{
Sex.hasMany(models.User, {as: "users",
                          foreignKey: "sex_id"})
}

return Sex

};
