const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {
  rootDirectoryPath,
  entryFilePath,
  featuresPath,
  vectorIconsPath,
  distPath,
  templateHtml,
  nodeModulesPath,
} = require('./paths');

const devServer = {
  contentBase: distPath,
  // enable HMR
  hot: true,
  // embed the webpack-dev-server runtime into the bundle
  inline: true,
  // serve index.html in place of 404 responses to allow HTML5 history
  historyApiFallback: true,
  port: 3000,
};
module.exports = merge(commonConfig, {
  devServer,
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
