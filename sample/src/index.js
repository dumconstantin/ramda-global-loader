var add10 = add(10)

var answer = pipe(
  add10,
  ifElse(
    equals(42),
    always('The answer to your Ramda import problems'),
    subtract(10)
  )
)

answer(32) // The answer to your Ramda import problems
