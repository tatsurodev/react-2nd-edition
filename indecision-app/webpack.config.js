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
    rules: [
      {
        // babel-loaderによって該当fileがtranspileされる。babelの設定fileはrootの.babelrc
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        // loaderとは違い、useはarrayで複数指定でき、後ろから順に適用される
        use: [
          // style tagにcssをset
          'style-loader',
          // cssをjsにcompile
          'css-loader',
          // sassをcssにcompile
          'sass-loader'
        ]
      }]
  },
  // error時のdebugをしやすくするためにsource mapを指定。bundle.jsが動いている雄一のjs fileだが、cheap-module-eval-source-mapで該当のerrorがどのjs fileで発生しているか、browser側が判断できるようになる
  devtool: 'cheap-module-eval-source-map',
  // webpack-dev-server vs live-server
  // live-serverで変更を即座に反映させるには、build系command(webpack --watch or bable --watch)とlive-serverの起動の2つが必要だが、webpack-dev-serverだとwebpack-dev-serverのcommand１つでおｋ。webpack-dev-serverは実際にはperformanceを上げるためにbuildをせずmemory上にbundle.jsを作ったように見せかけているだけで実際にはbundle.jsを作成していないので、productionにはbuild commandが必要な点に注意
  // webpack-dev-serverのsetup
  devServer: {
    // public folderのpath
    contentBase: path.join(__dirname, 'public')
  }
}