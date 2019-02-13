/*
  This is a Node file so it uses common.js module system
  (uses `require` and `module.exports`)
*/
/*
  This file is nested as root/features/bundling/paths.js,
  but we want to generate a dictionary of paths relative to the root.
*/

const path = require('path');

const rootDirectoryPath = path.resolve(__dirname, '../../');

function makeRootRelativePath(pathToAppend) {
  return path.resolve(__dirname, `${rootDirectoryPath}/${pathToAppend}`);
}

/*
  This dict will be processed so that each key will end in `Path`,
  i.e `entryFilePath`,
  and each value will become a full absolute file-system path,
  i.e /Users/me/Sites/my-repo/index.web.js
*/
const pathDictPreProcessed = {
  entryFile: 'index.web.js',
  features: 'features',
  vectorIcons: 'node_modules/react-native-vector-icons',
  font: 'features/bundling/font.js',
  dist: 'dist',
  templateHtml: 'features/bundling/template.html',
  nodeModules: 'node_modules',
};

module.exports = Object.keys(pathDictPreProcessed).reduce(
  (accum, key) => {
    const pathToAppend = pathDictPreProcessed[key];
    accum[`${key}Path`] = makeRootRelativePath(pathToAppend);
    return accum;
  },
  { rootDirectoryPath }
);
