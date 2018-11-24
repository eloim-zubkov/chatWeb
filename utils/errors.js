class NotFoundError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'NotFoundError';
		this.message = 'Entity not found';
		this.userMessage = 'Сущность не найдена';
		this.statusCode = 404;
	}
}

class UnauthorizedError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'UnauthorizedError';
		this.message = 'You have no access';
		this.userMessage = 'Доступ запрещен';
		this.statusCode = 401;
	}
}

exports.NotFoundError = NotFoundError;

exports.UnauthorizedError = UnauthorizedError;
