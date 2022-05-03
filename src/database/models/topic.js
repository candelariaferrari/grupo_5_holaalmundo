module.exports = (sequelize, dataTypes) => {
    let alias = 'Topic'; // esto debería estar en singular
    let cols = {
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
    };
    let config = {
        tableName: "Topic",
        timestamps: false,
    }

    const Topic = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Topic.associate = function(models){
        Topic.hasMany(models.Class, {
            as: "classes",
            foreignKey: "topic_id"
        });
    }

    return Topic

};