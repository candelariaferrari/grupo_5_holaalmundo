module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
        },
        last_name: {
            type: dataTypes.STRING,
        },
        phone: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING,
        },
        admin: {
            type: dataTypes.STRING,
        },
        user_sex_fk: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        user_rol_fk: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        user_address_fk: {
            type: dataTypes.INTEGER,
            allowNull: true
            
        },
        terms_conditions: {
            type: dataTypes.STRING,
            allowNull: false
        }

    };
    let config = {
        tableName: "User",
        timestamps: false,
    }

    const User = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    User.associate = function(models){
        User.belongsTo(models.Sex, {
            as: "sexo",
            foreignKey: "user_sex_fk"
        });
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "user_rol_fk"
        });
        User.belongsTo(models.Address, {
            as: "address",
            foreignKey: "user_address_fk"
        });
        User.belongsToMany(models.Comment, {
            as: "user_comment",
            through: "User_Comment",
            foreignKey: "id_user_fk",
            otherKey: "id_comment_fk",
            timestamps: false,
        });
        /** Como seria la relacion con la tabla intermedia */
        User.belongsToMany(models.Class, {
            as: "user_class",
            through: "User_Class",
            foreignKey: "id_user_fk",
            otherKey: "id_class_fk",
            timestamps: false,
        });
    }
    return User;
};