const _ = require('underscore');

module.exports = (app) => {
	_(['main']).each((name) => {
		require(`./${name}`)(app);
	});
};
