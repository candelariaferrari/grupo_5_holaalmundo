module.exports = (sequelize, dataTypes) => {
  let alias = "Order"; // esto debería estar en singular
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    total_price: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    id_user_fk: {
      type: dataTypes.BIGINT(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "Order",
    timestamps: false,
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "order_user",
      foreignKey: "id_user_fk",
    });

    Order.hasMany(models.Item, {
      as: "order_item",
      foreignKey: "id_order_fk",
    });
  };

  return Order;
};
