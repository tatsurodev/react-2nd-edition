import { createStore, combineReducers } from 'redux'
import { v4 as uuid } from 'uuid'

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
// defaultを{}にすることで引数なしでもおｋ
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// expenses reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // state.pushは破壊的で処理後のlengthを返すので正常に処理できない、concatは配列に追加すして写像を返す
      // return state.concat(action.expense)
      // es6 spread operatorで配列に追加
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}

// filters reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// storeの作成、demoStateのようなstateを複数のreducerを組み合わせて作成する
const store = createStore(
  // reducerをまとめる
  combineReducers({
    // keyとreducerのpair
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

// stateのdebug用
store.subscribe(() => {
  console.log(store.getState())
})

// store.dispatchの返り値はaction object
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }))
// expenseOneを削除
store.dispatch(removeExpense({ id: expenseOne.expense.id }))

const demoState = {
  expenses: [{
    id: 'fjdksafjlkdsajlk',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}