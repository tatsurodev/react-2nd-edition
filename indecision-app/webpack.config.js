const path = require('path')

// entry, output, mode必須
module.exports = {
  entry: './src/app.js',
  output: {
    // absolute pathのみ可
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  mode: 'development'
}