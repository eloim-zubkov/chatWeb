const _ = require('underscore');

module.exports = function(app) {
	_(['name', 'rooms']).each((file) => {
		require('./' + file)(app);
	});
};
