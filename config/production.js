const {configBuilder} = require('./index');

require('./common');

configBuilder.register({
	name: 'production',
	parent: 'common',
	config: {
		listen: {
			host: '192.168.0.104',
			port: 3000
		},
		env: 'production'
	}
});
