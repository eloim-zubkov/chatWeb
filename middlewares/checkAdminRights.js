const errors = require('../utils/errors');

module.exports = () => (req, res, next) => {
	if (req.session.user.group === 'admins') {
		return next();
	}

	throw new errors.UnauthorizedError('Not enoght rights');
};
