const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: `./src/index.js`,
    app: `./app/src/root.js`
  },
  output: {
    path: `build`,
    filename: `[name].js`
  },
  target: 'node',
  node: {
    __dirname: __dirname
  },
  externals: [
    nodeExternals()
  ],
  module: {
    node: {
      fs: "empty"
    },
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
