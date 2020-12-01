import { v4 as uuid } from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
})

// redux-thunkの設定でasync処理が可能
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData
    const expense = { description, note, amount, createdAt }
    // pushの返り値に挿入したdataのrefが返ってくる。returnすることでpromise chainが使用できる
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        )
      })
  }
}

// REMOVE_EXPENSE
// defaultを{}にすることで引数なしでもおｋ
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }))
      })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates))
      })
  }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
})

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const expenses = []
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          })
        })
        dispatch(setExpenses(expenses))
      })
  }
}
