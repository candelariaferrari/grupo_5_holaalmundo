module.exports = (sequelize, dataTypes) => {
  let alias = "Item"; // esto debería estar en singular
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    class_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    class_price: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    class_image: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    class_subtotal: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    class_quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_order_fk: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  let config = {
    tableName: "Item",
    timestamps: false,
  };

  const Item = sequelize.define(alias, cols, config);

  Item.associate = function (models) {
    Item.belongsTo(models.Order, {
      as: "item_order",
      foreignKey: "id_order_fk",
    });

    Item.belongsTo(models.User, {
      as: "user",
      foreignKey: "id_user_fk",
    });
  };

  return Item;
};
