const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve('app/index.jsx'),

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'static/scripts')
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve('app')
		}
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: [
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
