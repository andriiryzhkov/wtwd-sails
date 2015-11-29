/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Вибір всіх замовлень поточного користувача
  findUser: function(req, res, next) {

    id = req.session.passport.user;

    if (id) {
      Order.find({user: {id_user: id}}, function(err, orders) {
        if (orders === undefined) return res.notFound();
        if (err) return next(err);
        res.json(orders);
      });
    } else {
      return res.badRequest('Користувач не авторизован.');
    }
  },

  // Сторінка редагування заявок
  manage: function(req, res) {
    res.view('manager/order');
  }


};
