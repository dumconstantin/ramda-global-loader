# [Webpack](http://webpack.github.io/) RamdaJs loader that automatically imports functions

Start using RamdaJs functions right away without worring about imports.

It extracts the RamdaJs functions:
```javascript
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
```

and automatically adds them to the header of every file:
```javascript
import { add, pipe, ifElse, equals, always, substract } from 'ramda'

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
```

## Install:

```bash
$ npm install --save-dev ramda-global-loader
```

## Usage:

Add the loader to your `webpack.config.js`:

```javascript
module.exports = {
    // ...
    module: {
      loaders: [

        { test: /\.js$/, exclude: /node_modules/, loader: 'ramda-global-loader' }

      ]
    }
}
```

## Contributing:

Feel free to open issues to propose stuff and participate. Pull requests are also welcome.

## Licence:

[MIT](http://en.wikipedia.org/wiki/MIT_License)
