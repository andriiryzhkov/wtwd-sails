/**
 * TypeController
 *
 * @description :: Server-side logic for managing types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Сторінка редагування типів послуг
	manage: function(req, res) {
		res.view('manager/type');
	}

};
