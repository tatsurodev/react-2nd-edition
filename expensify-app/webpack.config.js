const path = require('path')
const webpack = require('webpack')
// cssを別fileに書き出すためのplugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

// objectではなく、関数を指定することによってenv等の引数の使用が可能になる
module.exports = (env) => {
  // webpack --evn productionのenv keyで得られる値によってdev or prodの判定を行う
  const isProduction = env === 'production'
  // mini-css-extract-pluginのfile名等設定
  const MiniCssExtract = new MiniCssExtractPlugin({
    filename: 'styles.css',
  })
  return {
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            // source mapを有効にするためにobject形式の指定方式に
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      MiniCssExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE': JSON.stringify(
          process.env.FIREBASE_DATABASE
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        'process.env.FIREBASE_APP_ID': JSON.stringify(
          process.env.FIREBASE_APP_ID
        ),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(
          process.env.FIREBASE_MEASUREMENT_ID
        ),
      }),
    ],
    // prod時のみsource-mapでsource mapを別fileに
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      // 公開するroot directory, index.html等のresourceがあるところ
      contentBase: path.join(__dirname, 'public'),
      // url直打ちで静的sourceが存在しない時404を返されるが、historyApiFallbackをtrueにするとtop urlを返した上でreact-routerによる変遷がなされる
      historyApiFallback: true,
      // bundleのpath
      publicPath: '/dist/',
    },
  }
}
