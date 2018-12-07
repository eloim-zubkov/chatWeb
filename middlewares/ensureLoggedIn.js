module.exports = () => (req, res, next) => {
	if (req.signedCookies.name) {
		return next();
	}

	res.redirect('/signin');
};
