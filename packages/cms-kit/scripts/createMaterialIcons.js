const path = require('path')
const {promises} = require('fs')
const {STATIC_PATH} = require('material-design-icons')
const glob = require('glob')
const svgr = require('@svgr/core').default

const filenameRegexp = /(.+?)_48px/g

function template({template}, _opts, {componentName, jsx}) {
  const typeScriptTemplate = template.smart({plugins: ['typescript']})
  return typeScriptTemplate.ast`export function ${componentName}(props: any) {return ${jsx}}`
}

glob(`${STATIC_PATH}/*/svg/production/*_48px.svg`, async (err, files) => {
  if (err) throw err

  for (const file of files) {
    const match = filenameRegexp.exec(path.basename(file))
    console.log(file, path.basename(file), match)

    if (!match) continue

    const name = match[1]
    const svgBuffer = await promises.readFile(file)
    const source = await svgr(
      svgBuffer,
      {
        dimensions: false,
        template
      },
      {componentName: snakeCaseToCamelCase(name)}
    )
    console.log(source)
  }
})

function snakeCaseToCamelCase(str) {
  return str.replace(/([-_][a-z])/gi, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}
