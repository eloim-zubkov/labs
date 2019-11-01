const React = require('react');
const {Route} = require('react-router');
const routes = require('./features/routes');

module.exports = (
	<Route path='/'>
		{routes}
	</Route>
);
