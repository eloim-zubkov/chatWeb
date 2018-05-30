const _ = require('underscore');

const isAsyncFunction = (func) =>
	func && func[Symbol.toStringTag] === 'AsyncFunction';

const mapArguments = (args) => _(args).map((arg) => {
	if (isAsyncFunction(arg)) {
		return (req, res, next) => {
			arg(req, res, next).catch(next);
		};
	} else if (_(arg).isArray()) {
		return mapArguments(arg);
	} else {
		return arg;
	}
});

module.exports = (app) => {
	_([
		'use',
		'get',
		'patch',
		'post',
		'put',
		'delete'
	]).each((name) => {
		const source = app[name];

		app[name] = (...args) => {
			if (name === 'get' && args.length === 1) {
				return app.set(args[0]);
			}

			source.apply(app, mapArguments(args));
		};
	});
};
