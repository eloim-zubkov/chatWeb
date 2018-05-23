const webSocket = require('ws');
const express = require('express');
const https = require('http');
const logger = require('./utils/logger');

const clients = {};

const wsServer = new webSocket.Server({
	port: config.port
});

wsServer.on('connection', (ws) => {
	
})

function init() {
	const app = express();

	app.use('/uploads', serveStatic(config.path.uploads));

	app.use(bodyParser.json());

	app.use('/static', serveStatic('./static'));

	app.listen(config.listen.port, config.listen.host);

	logger(`Server started on ${config.listen.host}:${config.listen.port}`);
}
