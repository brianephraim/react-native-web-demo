const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  imageLoaderConfiguration,
  babelLoaderConfiguration,
  fontLoaderConfiguration,
} = require('./loaderConfiguration');

const {
  entryFilePath,
  distPath,
  templateHtmlPath,
  nodeModulesPath,
  fontPath,
} = require('./paths');

module.exports = {
  entry: {
    rnwApp: [entryFilePath],
    vendor: ['react', 'react-dom', 'react-native-web', 'react-router-dom'],
    font: [fontPath],
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      fontLoaderConfiguration,
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
