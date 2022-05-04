// CREO Y EXPORTO EL MODELO 

module.exports = function(sequelize, dataTypes)  
{
let alias = 'Comment'

let cols = 
{
idComment: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
           },
nombres: {
          type: dataTypes.STRING,
          allowNull: false
         },
email: {
        type: dataTypes.STRING,
        allowNull: false
       },
description: {
              type: dataTypes.STRING,
              allowNull: false
             }
}

let config = {
              tableName: "Comment",
              timestamps: false,
             }

const Comment = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 

/*
Comment.associate = function(models)
{
Comment.belongsTo(models.User, {as: "user",
                                foreignKey: "idUsuarioFK"})
}
*/

return Comment

};
