const React = require('react');
const {render} = require('react-dom');
const {BrowserRouter} = require('react-router');
const screens = require('./screens');

render(
	(<BrowserRouter>{screens}</BrowserRouter>),
	document.getElementById('app')
);
