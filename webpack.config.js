const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const dist = path.resolve(__dirname, './dist')

module.exports =  {
  entry: './src/app.js',
  output: {
    path: dist,
    filename: '[name].js'
  },

  plugins: [new HtmlWebpackPlugin()],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    compress: true,
    port: 9000
  }
};