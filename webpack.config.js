const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/app.js',
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	
	plugins: [
		new HtmlWebpackPlugin()
	],
	
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
}