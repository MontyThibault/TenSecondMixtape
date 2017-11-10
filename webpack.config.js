const webpack = require('webpack');
const path = require('path');

module.exports = {

	entry: './client/src/index.js',
	output: {
		path: path.resolve(__dirname, 'client/public'),
		filename: "bundle.js"
	},

	devServer: {

		inline: true,
		publicPath: '/',
		contentBase: 'client/public/',
		port: 8080,

		historyApiFallback: true,

		proxy: {

			'/api/**': {

				target: 'http://localhost:3000/',
				secure: false

			}

		}

	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader"},

			{

				test: /\.scss$/,

				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader",
					options: { url: false }
				}, {
					loader: "sass-loader"
				}]

			},

			{

				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				query: {

					presets: ['es2015', 'react']

				}

			}
		]
	},

};
