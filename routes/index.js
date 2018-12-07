const _ = require('underscore');

module.exports = (app) => {
	_(['api', 'main']).each((name) => {
		require(`./${name}`)(app);
	});
};
