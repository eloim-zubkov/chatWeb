const _ = require('underscore');

module.exports = function(app) {
	_(['api', 'main']).each(function(file) {
		require('./' + file)(app);
	});
};
