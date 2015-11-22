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


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

};
