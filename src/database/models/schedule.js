// CREO Y EXPORTO EL MODELO 

module.exports = function(sequelize, dataTypes)
{
let alias = 'Schedule'

let cols = 
{
idSchedule: {
             type: dataTypes.BIGINT(10).UNSIGNED,
             primaryKey: true,
             allowNull: false,
             autoIncrement: true
            },
days: {
       type: dataTypes.STRING,
       allowNull: false
      },
time: {
       type: dataTypes.STRING,
       allowNull: false
      }
}

let config = {
              timestamps: false
             }

const Schedule = sequelize.define(alias,cols,config)

// RELACIONES ENTRE MODELOS 
    
Schedule.associate = function(models)
{
Schedule.hasMany(models.Class, {as: "classes",
                                foreignKey: "schedule_id"})
}

return Schedule

};
