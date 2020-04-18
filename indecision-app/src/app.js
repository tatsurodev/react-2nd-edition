// es6での使用例は、importを使う。from pathではなく、from 'moduleName'を使用すると、node_modules folderをwebpackが自動的に探しだす
import React from 'react'
import ReactDOM from 'react-dom'

const template = <p>THIS IS JSX FROM WEBPACK</p>
ReactDOM.render(template, document.getElementById('app'))