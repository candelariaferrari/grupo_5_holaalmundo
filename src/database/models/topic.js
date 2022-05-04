// CREO Y EXPORTO EL MODELO 

module.exports = function(sequelize, dataTypes)  
{
let alias = 'Topic'

let cols = 
{
idTopic: {
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
              tableName: "Topic",
              timestamps: false,
             }

const Topic = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 

Topic.associate = function(models)
{
Topic.hasMany(models.Class, {as: "classes",
                             foreignKey: "topic_id"})
}

return Topic

};
