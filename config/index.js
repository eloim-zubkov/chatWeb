const configBuilder = require('deep-conf')();

const makeTestParams = (baseConfig, testNumber) => ({
	listen: {
		port: baseConfig.listen.port + testNumber
	},
	mongodb: {
		database: `chatWeb${testNumber}`
	}
});

const testConfigRegExp = /(.*)Test(\d+)?$/;

exports = module.exports = () => {
	const name = process.env.NODE_ENV;
	let config;

	if (!name) {
		throw new Error('Config name is absent');
	}

	try {
		config = configBuilder.get(name);
	} catch (e) {
		const nameMatch = name.match(testConfigRegExp);

		if (nameMatch) {
			const baseName = nameMatch[1];
			const testNumber = Number(nameMatch[2]) || 1;

			require('./' + baseName);

			configBuilder.register({
				name,
				parent: baseName,
				config: makeTestParams(configBuilder.get(baseName), testNumber)
			});
		} else {
			require('./' + name);
		}

		config = configBuilder.get(name);
	}

	return config;
};

exports.configBuilder = configBuilder;
