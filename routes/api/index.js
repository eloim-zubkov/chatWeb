const _ = require('underscore');

module.exports = (app) => {
	_(['name', 'rooms']).each((name) => {
		require(`./${name}`)(app);
	});
};
