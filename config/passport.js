/**
 * Passport middleware configuration
 *
 * For more info on Passport, see:
 * http://passportjs.org/docs
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id_user);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    // Тут id_user - первинний ключ моделі User. Замініть при потребі
    id_user: id
  }).exec(function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
   // Налаштування атрибутів моделі User які 
   // використовуються в якості логіна та пароля
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Невідомий користувач ' + email
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Невірний пароль'
        });
      }
      return done(null, user);
    });
  }
));
