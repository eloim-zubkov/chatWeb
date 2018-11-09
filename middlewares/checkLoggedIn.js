const _ = require('underscore');
const errors = require('../utils/errors');

module.exports = () => (req, res, next) => {
	if (req.signedCookies.name) {
		return next();
	}

	throw new errors.AccessDeniedError();
};