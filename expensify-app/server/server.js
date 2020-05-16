// production用のsimpleなexpress serverを立てる
const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')
// herokuのdynamic portを取得
const port = process.env.PORT || 3000

// use methodでmiddlewareの設定、serverにaccessがある度にpublic folder内のfileをstatic fileとしてserveする
app.use(express.static(publicPath))

// index path('/', '/index.html')以外のfileは存在しないため直接accessされてしまうと404が出てしまうので、どのpathにaccessされてもindex.htmlを返すようにする。dev-serverのhistoryApiFallbackのような設定
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

// portの指定
app.listen(port, () => {
  console.log('Server is up!')
})