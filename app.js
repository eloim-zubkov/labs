const _ = require('underscore');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const config = require('./config');

async function init() {
	const app = express();

	app.set('views', './views');
	app.set('view engine', 'pug');

	app.use(bodyParser.json());

	app.use('/static', serveStatic('./builds'));

	app.use(require('./router'));

	app.listen(config.listen.port, config.listen.host);

	// eslint-disable-next-line no-console
	console.log(`Server started on ${config.listen.host}:${config.listen.port}`);

	app.use((err, req, res, next) => {
		// eslint-disable-next-line no-console
		console.log(err);

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
		// eslint-disable-next-line no-console
		console.log(err);
		process.exit(1);
	});
}