module.exports = (sequelize, dataTypes) => {
    let alias = 'Sale'; // esto debería estar en singular
    let cols = {
        idSale: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        total: {
            type: dataTypes.BIGINT,
            allowNull: false
        }
    };
    let config = {
        tableName: 'Sale',
        timestamps: false,
    }

    const Sale = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos
    Sale.associate = function(models){
        Sale.hasMany(models.Class, {
            as: "classCost",
            foreignKey: "sale_id"
        });
    }

    return Sale

};