module.exports = (sequelize, dataTypes) => {
    let alias = 'Sex'; // esto debería estar en singular
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
        tableName: "Sex",
        timestamps: false,
    }

    const Sex = sequelize.define(alias, cols, config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Sex.associate = function(models){
        Sex.hasOne(models.User, {
            as: "user_sex",
            foreignKey: "user_sex_fk"
        });
    }

    return Sex

};