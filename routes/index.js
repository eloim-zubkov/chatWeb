const _ = require('underscore');

module.exports = function(app) {
	_(['main', 'api']).each(function(file) {
		require('./' + file)(app);
	});
};
