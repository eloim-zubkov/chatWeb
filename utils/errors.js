class NotFoundError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'NotFoundError';
		this.message = 'Entity not found';
		this.userMessage = 'Сущность не найдена';
		this.statusCode = 404;
	}
}

class AccessDeniedError extends Error {
	constructor(...args) {
		super(...args);

		this.name = 'AccessDeniedError';
		this.message = 'You have no access';
		this.userMessage = 'Доступ запрещен';
		this.statusCode = 403;
	}
}

exports.NotFoundError = NotFoundError;

exports.AccessDeniedError = AccessDeniedError;
