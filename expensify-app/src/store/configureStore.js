import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

export default () => {
  // storeの作成、demoStateのようなstateを複数のreducerを組み合わせて作成する
  const store = createStore(
    // reducerをまとめる
    combineReducers({
      // keyとreducerのpair
      expenses: expensesReducer,
      filters: filtersReducer
    })
  )
  return store
}