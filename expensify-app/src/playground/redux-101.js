import { createStore } from 'redux'

// store作成時にdefaultのstateが必要になるので関数の引数のstateにdefault stateをset
// 第二引数のactionによって処理内容をswitch
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state

  }
})

console.log(store.getState())

// actoinをdispatch
store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'RESET'
})

store.dispatch({
  type: 'DECREMENT'
})

console.log(store.getState())
