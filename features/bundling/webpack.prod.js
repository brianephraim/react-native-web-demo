/*
  This module configures webpack for bundling this app for production.
*/
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(commonConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    ...commonConfig.output,
    publicPath: '',
  },
});
