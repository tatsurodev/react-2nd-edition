const path = require('path')

// objectではなく、関数を指定することによってenv等の引数の使用が可能になる
module.exports = (env) => {
  // webpack --evn productionのenv keyで得られる値によってdev or prodの判定を行う
  const isProduction = env === 'production'
  return {
    mode: 'development',
    entry: './src/app.js',
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
    // prod時のみsource-mapでsource mapを別fileに
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      // url直打ちで静的sourceが存在しない時404を返されるが、historyApiFallbackをtrueにするとtop urlを返した上でreact-routerによる変遷がなされる
      historyApiFallback: true
    }
  }
}