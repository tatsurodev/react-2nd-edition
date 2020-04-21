import { createStore } from 'redux'

// store作成時にdefaultのstateが必要になるので関数の引数のstateにdefault stateをset
// 第二引数のactionによって処理内容をswitch
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // incrementByが数字ならその数字、それ以外なら1
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
      return {
        count: state.count - decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state
  }
})

// stateをwatch, stateが変化する度、引数のcallbackを実行。subscribe関数の返り値はunsubscribeなので、返り値を再度callするとunsubscribeできる
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// dynamic actoinをdispatch、type propertyは必須でその他のpropertyはactionの引数として利用できる
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
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

store.dispatch({
  type: 'DECREMENT',
  decrementBy: 10
})

store.dispatch({
  type: 'SET',
  count: 101
})