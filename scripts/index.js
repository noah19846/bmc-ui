const fs = require('fs')
const path = require('path')
const { render, FileManager } = require('less')
const {
  COMPONENT_PATH,
  ES_PATH,
  LIB_PATH,
  SRC_PATH,
  UTILS_ORIGIN_PATH,
  UTILS_TARGET_PATH_LIB,
  UTILS_TARGET_PATH_ES
} = require('./constants')
const { transform } = require('@babel/core')

function transformJsCode(src, modulesType) {
  return transform(src, {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: modulesType
        }
      ]
    ]
  }).code
}

async function buildLess(filename) {
  const source = fs.readFileSync(filename, 'utf-8')
  const { css } = await render(source, {
    filename,
    plugins: [
      function install(lessInstance, pluginManager) {
        pluginManager.addFileManager(new FileManager())
      }
    ]
  })

  return css
}

async function build(targetPath) {
  const dir = await fs.promises.opendir(targetPath)

  for await (const dirent of dir) {
    const { name } = dirent
    const isDir = dirent.isDirectory()

    if (isDir) {
      const filePath = path.resolve(COMPONENT_PATH, name, 'index.less')

      if (fs.existsSync(filePath)) {
        const css = await buildLess(filePath)
        const targetPath = path.resolve(ES_PATH, 'components', name)
        const libPath = path.resolve(LIB_PATH, 'components', name)

        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true })
        }

        if (!fs.existsSync(libPath)) {
          fs.mkdirSync(libPath, { recursive: true })
        }

        fs.writeFileSync(path.resolve(ES_PATH, 'index.css'), css)
        fs.writeFileSync(path.resolve(targetPath, 'index.css'), css)
        fs.copyFileSync(filePath, path.resolve(targetPath, 'index.less'))

        fs.writeFileSync(path.resolve(ES_PATH, 'index.css'), css)
        fs.writeFileSync(path.resolve(LIB_PATH, 'index.css'), css)
        fs.copyFileSync(filePath, path.resolve(libPath, 'index.less'))

        const srcJsCode = fs.readFileSync(
          path.resolve(COMPONENT_PATH, name, 'index.js'),
          'utf-8'
        )
        const entryJsCode = fs.readFileSync(
          path.resolve(SRC_PATH, 'index.js'),
          'utf-8'
        )
        const utilSrcCode = fs.readFileSync(
          path.resolve(UTILS_ORIGIN_PATH, 'index.js'),
          'utf-8'
        )
        const code = transformJsCode(srcJsCode, false)
        const cjsCode = transformJsCode(srcJsCode, 'cjs')
        const entryCode = transformJsCode(entryJsCode, false)
        const entryCjsCode = transformJsCode(entryJsCode, 'cjs')
        const utilJsCode = transformJsCode(utilSrcCode, false)
        const utilCjsCode = transformJsCode(utilSrcCode, 'cjs')

        fs.writeFileSync(path.resolve(targetPath, 'index.js'), code)
        fs.writeFileSync(path.resolve(libPath, 'index.js'), cjsCode)
        fs.writeFileSync(path.resolve(ES_PATH, 'index.js'), entryCode)
        fs.writeFileSync(path.resolve(LIB_PATH, 'index.js'), entryCjsCode)

        if (!fs.existsSync(UTILS_TARGET_PATH_ES)) {
          fs.mkdirSync(UTILS_TARGET_PATH_ES, { recursive: true })
        }
        fs.writeFileSync(
          path.resolve(UTILS_TARGET_PATH_ES, 'index.js'),
          utilJsCode
        )

        if (!fs.existsSync(UTILS_TARGET_PATH_LIB)) {
          fs.mkdirSync(UTILS_TARGET_PATH_LIB, { recursive: true })
        }
        fs.writeFileSync(
          path.resolve(UTILS_TARGET_PATH_LIB, 'index.js'),
          utilCjsCode
        )
      }
    }
  }
}

build(COMPONENT_PATH)
