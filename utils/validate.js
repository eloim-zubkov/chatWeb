const conform = require('conform');

module.exports = (req, schema) => {
	const params = {...req.body, ...req.params, ...req.query};
	conform.validate(params, {properties: schema}, {
		cast: true,
		castSource: true,
		additionalProperties: false,
		applyDefaultValue: true,
		failOnFirstError: true
	});

	return params;
};
