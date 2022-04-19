module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        idUsuario: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        validationPassword: {
            type: dataTypes.STRING,
            allowNull: false
        },
        sex_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        terms_condition: {
            type: dataTypes.STRING,
            allowNull: false
        }

    };
    let config = {
        tableName: "User",
        timestamps: false,
    }

    const User = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    User.associate = function(models){
        User.belongsTo(models.Sex, {
            as: "sexo",
            foreignKey: "sex_id"
        });
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id"
        });
        /** Como seria la relacion con la tabla intermedia */
        User.belongsToMany(models.Class, {
            as: "classes",
            through: "Usuarios_Clases",
            foreignKey: "id_user",
            otherKey: "id_class",
            timestamps: false,
        });
    }
    return User;
};