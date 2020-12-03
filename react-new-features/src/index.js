import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// useStateの引数であるstateをobject形式で使用するpattern
// 問題点: stateの更新時に、全く新しいstateに置き換わってしまうため、1つのstateのみkey: valueで更新しようとすると、他のkey: valueのstateが失われてしまう。よってhooks使用時はuseStateを何度も使ったほうがわかりやすい
const App = (props) => {
  // const [count, setCount] = useState(props.count)
  // const [text, setText] = useState('')
  const [state, setState] = useState({
    count: props.count,
    text: '',
  })
  return (
    <div>
      <p>The current {state.text || 'count'} is {state.count}</p>
      {/* 解決方法 既存のstateをspreadした後に更新する */}
      {/* <button onClick={() => setState({ ...state, count: state.count - 1 })}>-1</button> */}
      <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
      <button onClick={() => setState({ count: props.count })}>Reset</button>
      <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
      <input value={state.text} onChange={e => setState({ text: e.target.value })} />
    </div>
  )
}

// useStateの引数であるstateをobject形式でなく、個別に値として使用するpattern
// stateless functional componentは、state, lifecycle methodが使用できなかったが、hooksにより使用できるようになり、functional componentに名称が変わった
// const App = (props) => {
//   // stateは、class componentの際のような{}の形式でなくてもおｋ
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState('')
//   return (
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>Reset</button>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <input value={text} onChange={e => setText(e.target.value)} />
//     </div>
//   )
// }

App.defaultProps = {
  count: 0,
}

ReactDOM.render(
  <App count={2} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
