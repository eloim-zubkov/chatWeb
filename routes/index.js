const _ = require('underscore');

module.exports = function(app) {
	_(['api', 'pages', 'main']).each((file) => {
		require('./' + file)(app);
	});
};
