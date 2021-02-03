const fs = require('fs')
const path = require('path')
const { render, FileManager } = require('less')
const { COMPONENT_PATH, ES_PATH, LIB_PATH } = require('./constants')
const { transform } = require('@babel/core')

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

        fs.writeFileSync(path.resolve(targetPath, 'index.css'), css)
        fs.copyFileSync(filePath, path.resolve(targetPath, 'index.less'))
        fs.writeFileSync(path.resolve(libPath, 'index.css'), css)
        fs.copyFileSync(filePath, path.resolve(libPath, 'index.less'))

        const srcJsCode = fs.readFileSync(
          path.resolve(COMPONENT_PATH, name, 'index.js'),
          'utf-8'
        )
        const { code } = transform(srcJsCode, {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        })

        const cjsCode = transform(srcJsCode, {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'cjs'
              }
            ]
          ]
        }).code

        fs.writeFileSync(path.resolve(targetPath, 'index.js'), code)
        fs.writeFileSync(path.resolve(libPath, 'index.js'), cjsCode)
      }
    }
  }
}

build(COMPONENT_PATH)
