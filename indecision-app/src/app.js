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
  render() {
    return (
      <div>
        <button>What should I do?</button>
      </div >
    )
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
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
  render() {
    return (
      <div>
        AddOption component here
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))