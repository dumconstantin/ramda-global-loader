import ramda from 'ramda'

module.exports = function (source, map) {

  this.cacheable()

  source = `import { ${Object.keys(ramda).join(', ') } } from 'ramda'\n${source}`

  this.callback(null, source, map)

}
