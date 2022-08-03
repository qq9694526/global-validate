'use strict';
const packageConfig = require('../package'),
  upperCamelCase = require('uppercamelcase'),
  fileName = packageConfig.name,
  libraryName = upperCamelCase(fileName);

module.exports = {
  library: libraryName,
  commonFileName: `${fileName}.common.js`,
  fileName: `${fileName}.js`
};
