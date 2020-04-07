// const obj = {
//   name: 'Vikram',
//   getName() {
//     return this.name
//   }
// }

// 通常のfunction内ではthisは、use strictの時undefined, それ以外の時window objectを指す
// const func = function () {
//   console.log(this)
// }
// func()

// const getNameは、obj.getNameを参照する只の関数になってしまったのでthis.nameのthisはobjではなく、windowもしくはundefinedとなる。よってgetNameをエラーなく作動させるには、bindでthisを指し示すものを指定するしかない
// error例
// const getName = obj.getName
// console.log(getName())
// ok例
// const getName = obj.getName.bind({ name: 'Andrew' })
// console.log(getName())

class IndecisionApp extends React.Component {
  render() {
    const title = "Indecision"
    const subtitle = "Put your life in the hands of a computer"
    const options = ['Thing one', 'Thing two', 'Thing three']

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={options} />
        <AddOption />
      </div>
    )
  }
}

// componentの作成
class Header extends React.Component {
  // render methodでjsxを返す
  render() {
    return (
      <div>
        {/* propsにaccess */}
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

class Action extends React.Component {
  handlePick() {
    alert('handlePick')
  }
  render() {
    return (
      <div>
        {/* eventですぐにfunctionをcallしたいわけではないので、括弧を付けずに括弧なしのreferenceをセットする */}
        <button onClick={this.handlePick}>What should I do?</button>
      </div >
    )
  }
}

class Options extends React.Component {
  // methodのthisを適切にbindするため、constructorでpropsとthisを設定している
  constructor(props) {
    super(props)
    this.handleRemoveAll = this.handleRemoveAll.bind(this)
  }
  // methodの中でclass instanceを参照するthisを使用したい時、そのままだとundefined or windowになるのでconstructorでhandleRemoveAllをthisを使えるものでoverride
  handleRemoveAll() {
    console.log(this.props.options)
    // alert('handleRemoveAll')
  }
  render() {
    return (
      <div>
        {/* 毎回bind(this)するのは面倒なのでconstructorでpropertyに指定しておく */}
        {/* <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button> */}
        <button onClick={this.handleRemoveAll}>Remove All</button>
        {
          this.props.options.map(option => <Option key={option} optionText={option} />)
        }
        {/* 上下は同値 */}
        {/* <Option></Option> */}
      </div>
    )
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>Option: {this.props.optionText}</div>
    )
  }
}

class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    if (option) {
      alert(option)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))