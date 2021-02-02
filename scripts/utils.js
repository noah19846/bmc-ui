const process = require('process')
const fs = require('fs')
const path = require('path')

function getProjectRootPath(targetPath = process.cwd()) {
  while (targetPath !== '/') {
    if (fs.existsSync(path.resolve(targetPath, 'package.json'))) {
      return targetPath
    }

    targetPath = path.resolve(targetPath, '..')
  }

  return '/'
}

// function writeFile(path, str) {
//   if (!fs.existsSync(path)) {

//   }
//   fs.
// }

module.exports = {
  getProjectRootPath
}
