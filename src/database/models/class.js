module.exports = (sequelize, dataTypes) => {
    let alias = 'Class'; // esto debería estar en singular
    let cols = {
        idClass: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        language: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        cap_max: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        visited: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        sale_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        link_class: {
            type: dataTypes.STRING,
            allowNull: false
        },
        level: {
            type: dataTypes.STRING,
            allowNull: false
        },
        schedule_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        topic_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "Class",
        timestamps: false,
    }

    const Class = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Class.associate = function(models){
        Class.belongsTo(models.Sale, {
            as: "sale_class",
            foreignKey: "sale_id"
        });
        Class.belongsTo(models.Schedule, {
            as: "schedule",
            foreignKey: "schedule_id"
        });
        Class.belongsTo(models.Topic, {
            as: "tematica",
            foreignKey: "topic_id"
        });
        /** Como seria la relacion con la tabla intermedia */
        Class.belongsToMany(models.User, {
            as: "users",
            through: "Usuarios_Clases",
            foreignKey: "id_class",
            otherKey: "id_user",
            timestamps: false,
        });
    }

    return Class

};