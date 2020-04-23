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
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
})

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
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
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
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

// filterされたexpenseを取得
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  // 3つの要素, text, startDate, endDateによってfilter
  // それぞれmatchするか判定、3つともtrueなら全体としてもtrueを返す
  return expenses.filter(expense => {
    // timestamps(milliseconds): 基準日が1970-01-01 ex. 334000, 10, -203
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    // 大文字小文字関係なくmatchするかどうか
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    // 比較関数を用いたsort
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amoount ? 1 : -1
    }
  })
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

// stateが更新される度にfilterされたexpenseを取得する
store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

// store.dispatchの返り値はaction object
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }))
// // expenseOneを削除
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// // expenseの編集
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
// // filter系
// store.dispatch(setTextFilter('fee'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))
// store.dispatch(setEndDate())

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

// object spread operator
/*
const user = {
  name: 'Jen',
  age: 24
}

console.log({
  name: 'John', // not override
  ...user,
  location: 'Pholadelphia',
  age: 27 // override
})
*/