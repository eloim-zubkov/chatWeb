const mongodbUri = require('mongodb-uri');
const {configBuilder} = require('./index');

configBuilder.register({
	name: 'common',
	config: {
		mongodb: {
			url: (config) => mongodbUri.format({
				database: config.mongodb.database,
				hosts: [{
					host: config.mongodb.host,
					port: config.mongodb.port
				}]
			}),
			host: '127.0.0.1',
			port: 27017,
			database: 'chat'
		},
		defaultLimit: 20
	}
});
