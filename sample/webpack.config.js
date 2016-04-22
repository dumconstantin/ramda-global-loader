
module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: __dirname + '/dist/bundle.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  resolveLoader: {
    modulesDirectories: [__dirname + '/../../', 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' ,
        query: { presets: ['es2015'] }
      },
      { test: /.*/, exclude: /node_modules/, loader: 'ramda-global-loader' }
    ]
  }
}
