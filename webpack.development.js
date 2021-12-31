const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		host: 'localhost',
		open: true,
		port: '3000',
		static: {
			directory: './dist',
		},
	},
});
