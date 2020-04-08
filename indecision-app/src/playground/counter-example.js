class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOne = this.handleAddOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
    this.handleReset = this.handleReset.bind(this)
    // stateの設定
    this.state = {
      count: 0,
    }
  }
  handleAddOne() {
    // 直接stateを更新するだけだと値がrerenderされない
    // this.state.count++
    // console.log(this.state.count)

    // componentのsetState methodでstateを更新されると自動的に変更が検知されrerenderされる
    // this.setState((prevState) => {
    //   return {
    //     count: prevState.count + 1
    //   }
    // })
  }
  handleMinusOne() {
    // ({ count: prevState.count -1 })のように外に()が付けないといけない理由は、()を付けないと{}だけとなりobjectを返しているという意味ではなく複数行に渡る処理の時に使用する{}の意味になってしまうため
    this.setState(prevState => ({ count: prevState.count - 1 }))
  }
  handleReset() {
    this.setState(() => ({ count: 0 }))
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'))

// let count = 0
// const addOne = () => {
//   count++
//   renderCounterApp()
// }
// const minusOne = () => {
//   count--
//   renderCounterApp()
// }
// const reset = () => {
//   count = 0
//   renderCounterApp()
// }


// const renderCounterApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   )
//   ReactDOM.render(templateTwo, appRoot)
// }
// renderCounterApp()