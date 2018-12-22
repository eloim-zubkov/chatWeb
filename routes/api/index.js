const _ = require('underscore');

module.exports = (app) => {
	_(['users', 'rooms', 'me']).each((name) => {
		require(`./${name}`)(app);
	});
};
