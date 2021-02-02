const path = require('path')
const { getProjectRootPath } = require('./utils')

const PROJECT_ROOT_PATH = getProjectRootPath()
const SRC_PATH = path.resolve(PROJECT_ROOT_PATH, 'src')
const COMPONENT_PATH = path.resolve(SRC_PATH, 'components')
const ES_PATH = path.resolve(PROJECT_ROOT_PATH, 'es')

module.exports = {
  PROJECT_ROOT_PATH,
  SRC_PATH,
  COMPONENT_PATH,
  ES_PATH
}
