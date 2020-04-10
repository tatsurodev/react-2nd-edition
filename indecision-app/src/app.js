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
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      options: props.options
    }
  }
  // 親のstateを子要素から変更させる必要があるので、propsとしてstateを変更するfunctionを渡す
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({ options: prevState.options.filter((option) => option !== optionToRemove) }))
    // console.log('hdo', optionToRemove)
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
    // pushは破壊的なのでprevStateで使わない
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
  }
  render() {
    const subtitle = "Put your life in the hands of a computer"

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          // 親要素のstateを変更するhandleDeleteOptions functionを子要素にpropsとして渡す
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    )
  }
}
IndecisionApp.defaultProps = {
  options: []
}

// componentの作成
const Header = (props) => (
  <div>
    {/* propsにaccess */}
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
)
Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => (
  <div>
    {/* eventですぐにfunctionをcallしたいわけではないので、括弧を付けずに括弧なしのreferenceをセットする */}
    <button
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      What should I do?
        </button>
  </div >
)

const Options = (props) => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    {
      props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
)

const Option = (props) => (
  <div>
    {props.optionText}
    <button
      // handleDeleteOptionだとeを引数にしてしまうので、無名関数内でhandleDeleteOptionに引数を持たせる
      // onClick={props.handleDeleteOption}
      onClick={
        (e) => {
          props.handleDeleteOption(props.optionText)
        }
      }
    >
      remove
      </button>
  </div>
)

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

    this.setState(() => ({ error }))
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

// stateless functional componentの定義
// const User = (props) => {
//   return (
//     <div>
//       {/* stateless functional componentはarrow functionで定義されており、thisが使えない点に注意。arrow functionの第一引数にはpropsを受け取れる */}
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   )
// }

ReactDOM.render(<IndecisionApp options={['Devils den', 'Second District']} />, document.getElementById('app'))