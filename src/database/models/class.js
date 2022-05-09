module.exports = (sequelize, dataTypes) => {
    let alias = 'Class'; // esto debería estar en singular
    let cols = {
        id: {
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
        week_days: {
            type: dataTypes.STRING,
            allowNull: false
        },
        week_times: {
            type: dataTypes.STRING,
            allowNull: false
        },
        level: {
            type: dataTypes.STRING,
            allowNull: false
        },
        topics: {
            type: dataTypes.STRING,
            allowNull: false
        },
        professions: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: dataTypes.FLOAT,
            allowNull: true
        },
        cap_max: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        visited: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        link_class: {
            type: dataTypes.STRING,
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
        Class.belongsToMany(models.User, {
            as: "class_user",
            through: "User_Class",
            foreignKey: "id_class_fk",
            otherKey: "id_user_fk",
            timestamps: false,
        });
    }

    return Class

};