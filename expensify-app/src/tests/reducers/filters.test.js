import moment from 'moment'
import filtersReducer from '../../reducers/filters'

// reducerのtest方法: reducerに引数のstate, actionを与え、期待通りにstateがsetされているかtest
test('should setup default filter values', () => {
  // @@INITはreduxによってdispatchされるaction、中身は特になしだがtest等にも使える
  const state = filtersReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('shold set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(state.sortBy).toBe('amount')
})

test('shold set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    // 初期値をamountにしておいてからactionでsortByをdateに変更、testする
    sortBy: 'amount'
  }
  const action = { type: 'SORT_BY_DATE' }
  const state = filtersReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const text = 'This is my filter'
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }
  const state = filtersReducer(undefined, action)
  expect(state.text).toBe(text)
})

test('should set start date filter', () => {
  const startDate = moment()
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action)
  // moment objectの判定なのでtoBeではなくtoEqualを使用
  expect(state.startDate).toEqual(startDate)
})

test('should set end date filter', () => {
  const endDate = moment()
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action)
  expect(state.endDate).toEqual(endDate)
})
