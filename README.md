# [Webpack](http://webpack.github.io/) + [RamdaJs](http://ramdajs.com/) loader that automatically imports functions

Start using RamdaJs functions right away without the ``` R. ``` namespace or worring about importing functions by hand.

It extracts RamdaJs functions:
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

and automatically adds them to the header of the file:
```javascript
var R = __webpack_require__(1)
var add = R.add
var pipe = R.pipe
var ifElse = R.ifElse
var equals = R.equals
var always = R.always
var subtract = R.subtract
var __ = R.__


var add10 = add(10)

var answer = pipe(
	add10,
	ifElse(
	  equals(42),
	  always('The answer to your Ramda import problems'),
	  subtract(__, 10)
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
