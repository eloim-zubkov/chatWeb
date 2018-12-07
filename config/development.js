const {configBuilder} = require('./index');

require('./common');

configBuilder.register({
	name: 'development',
	parent: 'common',
	config: {
		listen: {
			host: '127.0.0.1',
			port: 3000
		},
		env: 'development',
		secret: 'somesecret'
	}
});
