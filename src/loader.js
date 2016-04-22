import * as R from 'ramda'
import { traverse } from 'estraverse'
import ast from 'ast'
import * as acorn from 'acorn'

function rowAt(text, charNo) {
  let sub = text.substr(0, charNo)
  let rows = sub.split('\n')
  return rows.length
}

function charAt(text, charNo) {
  let sub = text.substr(0, charNo)
  return charNo - sub.lastIndexOf('\n')
}

module.exports = function (source, map) {

  this.cacheable()

  let ast

  try {
    ast = acorn.parse(source, {
      sourceType: 'module'
    })
  } catch (e) {
    console.error('[ramda-global-loader]', e)
    return source
  }

  let fns = []
  let ramdaFn = Object.keys(R).filter(x => x !== 'default')

  let file = this.resourcePath

  traverse(ast, {
    enter(node, parent) {
      if (-1 !== ramdaFn.indexOf(node.name)) {

        if (
          ('VariableDeclarator' === parent.type
          && parent.id.name === node.name)
          || 'ArrowFunctionExpression' === parent.type
        ) {

          throw new Error(`

    [ramda-global-loader]
    Error: "${node.name}" is redeclared in ${file}:${rowAt(source, node.start)}:${charAt(source, node.start)}
    RamdaJs functions shouldn't be redeclared if you want to use RamdaJs without the R. namespace.

            `)
        }

        if (
          undefined === parent.object
          && 'FunctionDeclaration' !== parent.type
          && -1 === fns.indexOf(node.name)
        ) {
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
