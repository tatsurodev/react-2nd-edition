import moment from 'moment'
import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

// text filterのtest
test('should filter by test value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  // expenses[0]はfilter outされている
  expect(result).toEqual([expenses[2], expenses[1]])
})

// start date filterのtest
test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0]])
})

// end date filterのtest
test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days')
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1]])
})

// sort by dateのtest
test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])

})

// sort by amountのtest
test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})