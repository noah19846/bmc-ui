const { render, FileManager } = require('less')
const fs = require('fs')

async function buildLess() {
  const source = fs.readFileSync('./src/components/button/style.less', 'utf-8')
  const { css } = await render(source, {
    filename: './src/components/button/style.less',
    plugins: [
      function install(lessInstance, pluginManager) {
        pluginManager.addFileManager(new FileManager())
      }
    ]
  })
  console.log(css)
}

async function buildEsm() {
  console.log('building...')
  await buildLess()
  console.log('build successfully.')
}

buildEsm()
