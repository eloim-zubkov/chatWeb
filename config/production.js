const {configBuilder} = require('./index');

require('./common');

configBuilder.register({
	name: 'production',
	parent: 'common',
	config: {
		env: 'production'
	}
});
