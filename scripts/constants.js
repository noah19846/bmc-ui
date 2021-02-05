const path = require('path')
const { getProjectRootPath } = require('./utils')

const PROJECT_ROOT_PATH = getProjectRootPath()
const SRC_PATH = path.resolve(PROJECT_ROOT_PATH, 'src')
const COMPONENT_PATH = path.resolve(SRC_PATH, 'components')
const ES_PATH = path.resolve(PROJECT_ROOT_PATH, 'es')
const LIB_PATH = path.resolve(PROJECT_ROOT_PATH, 'lib')
const UTILS_ORIGIN_PATH = path.resolve(SRC_PATH, 'utils')
const UTILS_TARGET_PATH_LIB = path.resolve(LIB_PATH, 'utils')
const UTILS_TARGET_PATH_ES = path.resolve(ES_PATH, 'utils')

module.exports = {
  PROJECT_ROOT_PATH,
  SRC_PATH,
  COMPONENT_PATH,
  ES_PATH,
  LIB_PATH,
  UTILS_ORIGIN_PATH,
  UTILS_TARGET_PATH_LIB,
  UTILS_TARGET_PATH_ES
}
