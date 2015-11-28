/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  // Sockets
  if (req.isSocket) {
    if (req.session &&
      req.session.passport &&
      req.session.passport.user) {
      //Use this:

      // Initialize Passport
      sails.config.passport.initialize()(req, res, function() {
        // Use the built-in sessions
        sails.config.passport.session()(req, res, function() {
          // Make the user available throughout the frontend
          //res.locals.user = req.user;
          //the user should be deserialized by passport now;
          next();
        });
      });

      //Or this if you dont care about deserializing the user:
      //req.user = req.session.passport.user;
      //return next();

    } else {
      res.json(401);
    }


  } else if (req.isAuthenticated()) {
    res.locals.manage = 0;
    return next();
  } else {
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden();
  }
};
