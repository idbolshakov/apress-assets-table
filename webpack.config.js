// jshint ignore: start
const path = require('path');
const webpack = require('webpack');
const nodeSass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  devtool: NODE_ENV === 'development' ? 'eval' : '',
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/index')],
    ['assets-table']: ['babel-polyfill', path.resolve(__dirname, './src/index')],
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    preLoaders: [{
      test: /\.js|jsx$/,
      loaders: ['eslint'],
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    },
    {
      test: /\.scss|.sass$/,
      loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass'),
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  sassLoader: {
    functions: {
      'encode-base64($string)': ($string) => {
        const buffer = new Buffer($string.getValue());
        return nodeSass.types.String(buffer.toString('base64'));
      },
    },
  },
  resolve: {
    modulesDirectories: [
      './node_modules',
      './src',
    ],
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('assets-table.css', {allChunks: true}),
    new webpack.BannerPlugin('eslint-disable'),
    new webpack.BannerPlugin('jshint ignore: start'),
    new webpack.BannerPlugin('scss-lint:disable all'),
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './dist'),
    ], {root: path.dirname(__dirname), verbose: true}),
  ]
};

if (NODE_ENV === 'development') {
  config.entry.app.unshift('webpack-hot-middleware/client');
  config.output.publicPath = '/static/';
  config.module.loaders[0].loaders.unshift('react-hot');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
