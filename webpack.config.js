// jshint ignore: start
const path = require('path');
const webpack = require('webpack');
const nodeSass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  devtool: NODE_ENV === 'development' ? 'source-map' : '',
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/index')],
    ['assets-table']: [path.resolve(__dirname, './src/export')],
    ['assets-help']: [path.resolve(__dirname, './src/exportHelp')]
  },
  output: {
    library: 'Assets-table',
    libraryTarget: 'umd',
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
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.woff$/,
      loader: 'url?limit=65000000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
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
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router'
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux'
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux'
    },
    'app': 'app',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
     'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new webpack.BannerPlugin('eslint-disable', {entryOnly: false}),
    new webpack.BannerPlugin('jshint ignore: start', {entryOnly: false}),
    new webpack.BannerPlugin('scss-lint:disable all', {entryOnly: false}),
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
  config.module.loaders[1].loader = "style-loader!css-loader?sourceMap!sass-loader?sourceMap";
  config.module.loaders[2].loader = "style-loader!css-loader?sourceMap!";
  config.externals = {};
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
