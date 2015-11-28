/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  login: function(req, res) {
    res.view();
  },

  passport_local: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        res.redirect('/login');
        return;
      }

      req.logIn(user, function(err) {
        if (err) {
          res.redirect('/login');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  register: function(req, res) {
    User.create(req.body).exec(function(err, created){
    });
    res.redirect('/');
  },

  // Вибір інформації про поточного користувача
  findUser: function(req, res, next) {

    id = req.session.passport.user;

    if (id) {
      User.find(id, function(err, user) {
        if (user === undefined) return res.notFound();
        if (err) return next(err);
        res.json(user);
      });
    } else {
      return res.badRequest('Користувач не авторизован.');
    }
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

};
