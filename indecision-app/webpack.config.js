const path = require('path')

// entry, output, mode必須
module.exports = {
  entry: './src/app.js',
  output: {
    // absolute pathのみ可
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  mode: 'development',
  // loaderの設定
  module: {
    rules: [{
      // babel-loaderによって該当fileがtranspileされる。babelの設定fileはrootの.babelrc
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  // error時のdebugをしやすくするためにsource mapを指定。bundle.jsが動いている雄一のjs fileだが、cheap-module-eval-source-mapで該当のerrorがどのjs fileで発生しているか、browser側が判断できるようになる
  devtool: 'cheap-module-eval-source-map'
}