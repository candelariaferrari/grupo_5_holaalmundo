module.exports = (sequelize, dataTypes) => {
    let alias = 'Schedule'; // esto debería estar en singular
    let cols = {
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
    };
    let config = {
        timestamps: false,
    }

    const Schedule = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Schedule.associate = function(models){
        Schedule.hasMany(models.Class, {
            as: "classes",
            foreignKey: "schedule_id"
        });
    }

    return Schedule

};