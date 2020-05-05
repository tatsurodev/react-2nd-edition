import React from 'react'
import { connect } from 'react-redux'
import { removeExpense } from '../actions/expenses'

// 引数propsをdestructure
// propsにdispatchがあるのでactionの実行にそれを使う
const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
    <button onClick={() => {
      dispatch(removeExpense({ id }))
    }} >Remove</button>
  </div>
)

// ExpenseListItemではstateにaccessする必要はなく、dispatchするだけなのでmapStateToPropsは必要なし
export default connect()(ExpenseListItem)