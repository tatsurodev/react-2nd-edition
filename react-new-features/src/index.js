import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

const NoteApp = () => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote = e => {
    e.preventDefault()
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ])
    setTitle('')
    setBody('')
  }

  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title))
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'))
    if (notesData) {
      setNotes(notesData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
        <button>Add note</button>
      </form>
    </div>
  )
}

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect!')
    // useEffectの引数である関数の中で関数を返すとcomponentWillUnmountのtimingで実行される
    return () => {
      console.log('Cleaning up effect!')
    }
    // dependenciesを明記しないと,親要素のNoteAppのnote.title, note.bodyが更新される度rerenderされ、子componentのNoteもrerenderされるのでここのuseEffectが実行されてしまうので注意
  }, [])

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  )
}

// useStateの引数であるstateをobject形式で使用するpattern
// 問題点: stateの更新時に、全く新しいstateに置き換わってしまうため、1つのstateのみkey: valueで更新しようとすると、他のkey: valueのstateが失われてしまう。よってhooks使用時はuseStateを何度も使ったほうがわかりやすい
// const App = (props) => {
//   // const [count, setCount] = useState(props.count)
//   // const [text, setText] = useState('')
//   const [state, setState] = useState({
//     count: props.count,
//     text: '',
//   })
//   return (
//     <div>
//       <p>The current {state.text || 'count'} is {state.count}</p>
//       {/* 解決方法 既存のstateをspreadした後に更新する */}
//       {/* <button onClick={() => setState({ ...state, count: state.count - 1 })}>-1</button> */}
//       <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
//       <button onClick={() => setState({ count: props.count })}>Reset</button>
//       <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
//       <input value={state.text} onChange={e => setState({ text: e.target.value })} />
//     </div>
//   )
// }

// useStateの引数であるstateをobject形式でなく、個別に値として使用するpattern
// stateless functional componentは、state, lifecycle methodが使用できなかったが、hooksにより使用できるようになり、functional componentに名称が変わった
const App = (props) => {
  // stateは、class componentの際のような{}の形式でなくてもおｋ
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState('')
  // useEffectは、componentDidMountとcomponentDidUpdate(stateとpropsが更新された時)を合わせたようなもの
  // useEffectは何個も実行できるのでclass based componentのlifecycle methodのように関連性のないものが一箇所にごっちゃに成ることがない
  useEffect(() => {
    console.log('This should only run once!')
    // depends on nothingの状態でcomponentDidMountの時1回だけ実行させる
  }, [])
  useEffect(() => {
    console.log('useEffect ran')
    document.title = count
  }, [count])
  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  )
}

// App.defaultProps = {
//   count: 0,
// }

ReactDOM.render(
  // <App count={0} />,
  <NoteApp />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

