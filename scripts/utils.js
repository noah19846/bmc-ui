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

module.exports = {
  getProjectRootPath
}
