const path = require('path');
const {
  rootDirectoryPath,
  entryFilePath,
  featuresPath,
  vectorIconsPath,
} = require('./paths');

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [entryFilePath, featuresPath, vectorIconsPath],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['react-native-web', 'syntax-dynamic-import'],
      presets: ['@babel/preset-env', 'module:metro-react-native-babel-preset'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};
const fontLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: path.resolve(
    __dirname,
    `${rootDirectoryPath}/node_modules/react-native-vector-icons`
  ),
};

module.exports = {
  imageLoaderConfiguration,
  babelLoaderConfiguration,
  fontLoaderConfiguration,
};
