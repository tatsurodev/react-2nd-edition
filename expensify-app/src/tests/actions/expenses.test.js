// test.jsの拡張子でtest対象
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
// configureMockStoreの引数にはmiddlewareを指定
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  // async処理なのでdoneで終わりを知らせないとdataをsetし終わる前にbeforeEachが終了してtestに入ってしまう
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  // toBeは===を期待するのでarray===another_array, object===another_objectは成り立たないので、中身が等しければtrueとなるtoEqualを使用する
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  })
})

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[2].id
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      })
      return database.ref(`users/${uid}/expenses/${id}`).once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy()
      done()
    })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value',
    },
  })
})

test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  const updates = { amount: 21045 }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates,
    })
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .once('value')
      .then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done()
      })
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000,
  }
  // startAddExpenseはasynchronousなのでdoneでjestにtestが終わったことを知らせる必要がある
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      })
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expenseDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  }
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefault,
        },
      })
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefault)
      done()
    })
})

// test('should setup add expense action object with default values', () => {
//   const action = addExpense()
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   })
// })

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  })
})

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    })
    done()
  })
})
