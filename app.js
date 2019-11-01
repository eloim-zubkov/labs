const _ = require('underscore');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const logger = require('./utils/logger');
const config = require('./config')();

async function init() {
	const app = express();

	const server = http.Server(app);

	require('./utils/express/async')(app);

	await require('./db').init();

	app.set('views', './views');
	app.set('view engine', 'pug');
	app.locals = require('./views/helpers');

	app.use(bodyParser.json());

	app.use('/static', serveStatic('./static'));

	require('./routes')(app);

	server.listen(config.listen);
	logger(`Server started on ${config.listen.host}:${config.listen.port}`);

	app.use((err, req, res, next) => {
		logger(err);

		if (res.headersSent) {
			return next(err);
		}

		res.status(err.statusCode || 500).json(
			_(err).pick('name', 'message', 'userMessage')
		);
	});
}

if (module.parent) {
	module.exports = init;
} else {
	init().catch((err) => {
		logger(err);
		process.exit(1);
	});
}