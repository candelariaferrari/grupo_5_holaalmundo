module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol'; // esto debería estar en singular
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
        }
    };
    let config = {
        tableName: 'Rol',
        timestamps: false,
    }

    const Rol = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Rol.associate = function(models){
        Rol.hasOne(models.User, {
            as: "user_rol",
            foreignKey: "user_rol_fk"
        });
    }

    return Rol;

};