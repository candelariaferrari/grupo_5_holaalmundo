const db = require("../database/models");

module.exports = {
  listCart: async (req, res) => {
    let items = await db.Item.findAll({
      where: {
        id_user_fk: req.session.userLogged.id,
        id_order_fk: null, // should be null
      },
    });
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.class_subtotal;
    });
    console.log("EL precio total es: ", totalPrice + "\n");
    console.log("Los items son: ", items);
    return res.render("shoppingCart/shoppingCart", { items, totalPrice });
  },
  // How to create the cart item
  addProduct: async (req, res) => {
    let classFound = await db.Class.findByPk(req.params.id);
    await db.Item.create({
      class_name: classFound.description,
      class_price: Number(classFound.price),
      class_image: classFound.image,
      class_subtotal: Number(req.body.cantidad) * Number(classFound.price),
      class_quantity: Number(req.body.cantidad),
      id_user_fk: req.session.userLogged.id,
      /**id_order_fk: xxx */
    });
    return res.redirect("/cart");
  },
  destroyItem: async (req, res) => {
    await db.Item.destroy({
      where: {
        id: req.params.id, // How do I get this params?
      },
    });
    res.redirect("/cart");
  },
  addOrder: async (req, res) => {
    let items = await db.Item.findAll({
      where: {
        id_user_fk: req.session.userLogged.id,
        id_order_fk: null,
      },
    });
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.subtotal;
    });
    let orderNew = await db.Order.create({
      total_price: totalPrice,
      id_user_fk: req.session.userLogged.id,
    });
    await db.Item.update(
      {
        id_order_fk: orderNew.id,
      },
      {
        where: {
          id_user_fk: req.session.userLogged.id,
          id_order_fk: null,
        },
      }
    );
    return res.redirect("/");
  },
};
