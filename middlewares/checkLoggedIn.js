const errors = require('../utils/errors');

module.exports = () => (req, res, next) => {
	if (req.session.auth) {
		return next();
	}

	throw new errors.UnauthorizedError();
};
