import { createStore } from 'redux'

// store作成時にdefaultのstateが必要になるので関数の引数のstateにdefault stateをset
const store = createStore((state = { count: 0 }) => {
  return state
})

console.log(store.getState())
