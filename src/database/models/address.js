module.exports = (sequelize, dataTypes) => {
    let alias = 'Address'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        description: {
            type: dataTypes.STRING,
        },
        post_code: {
            type: dataTypes.STRING,
        },
        province: {
            type: dataTypes.STRING,
        },
        country: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: 'Address',
        timestamps: false,
    }

    const Address = sequelize.define(alias, cols, config);

    Address.associate = function(models){
        Address.hasOne(models.User, {
            as: "user_address",
            foreignKey: "user_address_fk"
        });
    }

    return Address;

};