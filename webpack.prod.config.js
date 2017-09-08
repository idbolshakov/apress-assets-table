// jshint ignore: start
const path = require('path');
const webpack = require('webpack');
const nodeSass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/index')],
    'assets-table': [path.resolve(__dirname, './src/export')],
    'assets-help': [path.resolve(__dirname, './src/exportHelp')]
  },
  output: {
    library: 'Assets-table',
    libraryTarget: 'umd',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      use: ['eslint-loader'],
    },
    {
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.scss|.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            functions: {
              'encode-base64($string)': ($string) => {
                const buffer = new Buffer($string.getValue());
                return nodeSass.types.String(buffer.toString('base64'));
              }
            },
          },
        }]
      }),
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    {
      test: /\.woff$/,
      use: 'url-loader?limit=65000000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
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
    app: 'app'
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    new webpack.BannerPlugin({banner: 'eslint-disable', entryOnly: false}),
    new webpack.BannerPlugin({banner: 'jshint ignore: start', entryOnly: false}),
    new webpack.BannerPlugin({banner: 'scss-lint:disable all', entryOnly: false}),
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './dist'),
    ], {root: path.dirname(__dirname), verbose: true}),
  ]
};

module.exports = config;
