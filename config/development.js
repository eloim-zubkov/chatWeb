const {configBuilder} = require('./index');

require('./common');

configBuilder.register({
	name: 'development',
	parent: 'common',
	config: {
		env: 'development'
	}
});
