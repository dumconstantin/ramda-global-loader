import * as R from 'ramda'
import { traverse } from 'estraverse'
import ast from 'ast'
import * as acorn from 'acorn'

module.exports = function (source, map) {

  this.cacheable()

  let fns = []
  let ramdaFn = Object.keys(R).filter(x => x !== 'default')
  var ast = acorn.parse(source, {
    sourceType: 'module'
  })

  traverse(ast, {
    enter(node, parent) {
      if (-1 !== ramdaFn.indexOf(node.name)) {
        if (undefined === parent.object && 'FunctionDeclaration' !== parent.type && -1 === fns.indexOf(node.name)) {
          fns.push(node.name)
        }
      }
      return node
    }
  })

  let header = 'var R = require("ramda")\n'
  header += R.join('\n', R.map(x => `var ${x} = R.${x}`, fns))
  source = header + '\n\n' + source

  this.callback(null, source, map)

}
