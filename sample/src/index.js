var add10 = add(10)

var answer = pipe(
  add10,
  ifElse(
    equals(42),
    always('The answer to your Ramda import problems'),
    subtract(__, 10)
  )
)


var foo = apply

const _map = curry((fn, stream) => stream.map(fn))

const _filter = curry((fn, stream) => stream.filter(fn))

const flatMap = curry((fn, stream) => {
  return stream.flatMap(fn)
})
const ifErrPatch = curry((op, path, stream) => {
  return stream.mapErrors(err => {
    let newErr = {
      status: err.status,
      message: err.statusText,
      responseText: err.responseText,
      property: 'ajax'
    }
    return createPatch(op, path, newErr)
  })
})

const patch = curry((op, path, value, stream) => {
  return stream.flatMap(x => {
    if (true === value instanceof Kefir.Observable) {
      value = x
    }
    return streamPatch(op, path, value, x)
  })
})

const patchSelf = curry((op, path, stream) => {
  return patch(op, path, stream, stream)
})

const streamPatch = curry((op, path, v1, v2) => {
  return Kefir.stream(emitter => {
    emitter.error(createPatch(op, path, v1))
    emitter.emit(v2)
  })
})

module.exports = answer
