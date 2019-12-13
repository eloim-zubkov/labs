const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'none',

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve('app')
		}
	},

	entry: './app/index.jsx',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'builds/')
	},

	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	}
};
