/*
  This module configures webpack for bundling this app in general.
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  entryFilePath,
  distPath,
  templateHtmlPath,
  nodeModulesPath,
  featuresPath,
} = require('./paths');

module.exports = {
  entry: {
    rnwApp: [entryFilePath],
    vendor: ['react', 'react-dom', 'react-native-web'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [entryFilePath, featuresPath],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-native-web', 'syntax-dynamic-import'],
            presets: [
              '@babel/preset-env',
              'module:metro-react-native-babel-preset',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: templateHtmlPath,
      title: 'react-native-plus-web',
      filename: 'index.html',
    }),
  ],
  output: {
    path: distPath,
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web/dist/cjs',
    },
    symlinks: false,
    extensions: ['.web.js', '.js'],
    modules: [nodeModulesPath],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
