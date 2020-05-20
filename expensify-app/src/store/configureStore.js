import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  // storeの作成、demoStateのようなstateを複数のreducerを組み合わせて作成する
  const store = createStore(
    // reducerをまとめる
    combineReducers({
      // keyとreducerのpair
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    // redux devtools用の設定
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // redux devtoolsがなければapplyMiddleware(thunk)でredux-thunkの使用が可能
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}