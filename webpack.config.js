const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const dist = path.resolve(__dirname, './dist')

module.exports =  {
  entry: {
	  main: './src/app.js',
	  worker: './src/worker.js'
  },
  
  output: {
    path: dist,
    filename: '[name].js'
  },
  
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({
	  chunks: ['main']
  })],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    compress: true,
    port: 9000
  }
};