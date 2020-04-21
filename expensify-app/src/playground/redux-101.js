import { createStore } from 'redux'

// 関数の引数に分割代入を使用する
/*
const add = ({ a, b }, c) => {
  return a + b + c
}
// 第一引数 { a, b } = { a: 1, b: 12 }となり、a = 1, b = 12となる
console.log(add({ a: 1, b: 12 }, 100))
*/

// action generator: action objectを返す関数
// payloadのdefaultをobjectにしておかないとpayloadが与えられなかった時にpayload.incrementByで変数payloadが定義されていないのでerrorとなる。payloadがなかった時は、{}がdefault値となり、undefined扱いとなるので、undefined.incrementByもundefinedとなりerrorが発生しない
/*
const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  // incrementByが数字ならその数字、それ以外なら1
  incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
})
*/
// 上記を分割代入と引数のdefault値を使って簡略化
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

// 引数は必須なのでdefaultを設定しない
const setCount = ({ count }) => ({
  type: 'SET',
  count
})

const resetCount = () => ({
  type: 'RESET'
})

// store作成時にdefaultのstateが必要になるので関数の引数のstateにdefault stateをset
// 第二引数のactionによって処理内容をswitch
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
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
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// })
// action generatorで引数にobjectの{increment: 5}を渡す、上下は同値
store.dispatch(incrementCount({ incrementBy: 5 }))

// actionを直接objectで指定する時の欠点は、actoinのtypeにtypoがあってもerrorが出ない
// store.dispatch({
//   type: 'INCREMENTT'
// })
// action generatorを利用する利点は、typoがあるとerror表示される
store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))