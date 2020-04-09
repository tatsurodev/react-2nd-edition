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
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      options: []
    }
  }
  // 親のstateを子要素から変更させる必要があるので、propsとしてstateを変更するfunctionを渡す
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    })
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[Math.floor(randomNum)]
    alert(option)
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }
    this.setState((prevState) => {
      return {
        // pushは破壊的なのでprevStateで使わない
        options: prevState.options.concat([option])
      }
    })
  }
  render() {
    const title = "Indecision"
    const subtitle = "Put your life in the hands of a computer"

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          // 親要素のstateを変更するhandleDeleteOptions functionを子要素にpropsとして渡す
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
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
  render() {
    return (
      <div>
        {/* eventですぐにfunctionをcallしたいわけではないので、括弧を付けずに括弧なしのreferenceをセットする */}
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div >
    )
  }
}

class Options extends React.Component {
  // methodのthisを適切にbindするため、constructorでpropsとthisを設定している
  // constructor(props) {
  //   super(props)
  //   this.handleRemoveAll = this.handleRemoveAll.bind(this)
  // }
  // methodの中でclass instanceを参照するthisを使用したい時、そのままだとundefined or windowになるのでconstructorでhandleRemoveAllをthisを使えるものでoverride
  // handleRemoveAll() {
  //   console.log(this.props.options)
  //   // alert('handleRemoveAll')
  // }
  render() {
    return (
      <div>
        {/* 毎回bind(this)するのは面倒なのでconstructorでpropertyに指定しておく */}
        {/* <button onClick={this.handleRemoveAll.bind(this)}>Remove All</button> */}
        {/* propsとして親から渡されたfunctionを実行、親stateを更新する */}
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
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
  constructor(props) {
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    const error = this.props.handleAddOption(option)

    this.setState(() => {
      return {
        // error: error
        error
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))