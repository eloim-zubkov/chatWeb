module.exports = (message) => {
	if (process.env.NODE_ENV !== 'developmentTest') {
		// eslint-disable-next-line no-console
		console.log(message);
	}
};
