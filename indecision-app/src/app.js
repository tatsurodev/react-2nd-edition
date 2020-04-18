// es6での使用例は、importを使う。from pathではなく、from 'moduleName'を使用すると、node_modules folderをwebpackが自動的に探しだす
import React from 'react'
import ReactDOM from 'react-dom'
import IndecisionApp from './component/IndecisionApp'

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))

// class fieldの使い方。react component内のthisをbindする方法を簡潔化できる。es2019でもまだ追加されていないのでbabelのpluginでcompileする必要あり
// 従来の方法、constructor内でpropertyとmethodのthisをbind
/*
class OldSyntax {
  constructor() {
    this.name = 'Mike'
    this.getGreeting = this.getGreeting.bind(this)
  }
  getGreeting() {
    return `Hi. My name is ${this.name}`
  }
}
const oldSyntax = new OldSyntax()
const getGreeting = oldSyntax.getGreeting
console.log(getGreeting())
*/
// 新しい方法、class fieldあり
/*
class NewSyntax {
  // 変数のtype指定なしでkeyとvalueの組み合わせを指定するとclass fieldsを設定できる
  name = 'Jen'
  getGreeting = () => {
    return `Hi. My name is ${this.name}`
  }
}
const newSyntax = new NewSyntax()
const newGetGreeting = newSyntax.getGreeting
console.log(newGetGreeting())
*/