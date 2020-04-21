const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/playground/destructuring.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // url直打ちで静的sourceが存在しない時404を返されるが、historyApiFallbackをtrueにするとtop urlを返した上でreact-routerによる変遷がなされる
    historyApiFallback: true
  }
}