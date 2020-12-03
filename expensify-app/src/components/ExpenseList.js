import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// stateとunconnectedな状態でtestする必要があるのでexport
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map((expense) => {
        // jsxの新機能、スプレッド属性(spread attributes): 渡されたobjectのpropertyはcomponentのpropsに一気に渡せる
        return <ExpenseListItem key={expense.id} {...expense} />
      })
    )}
  </div>
)

// propsにmapするstateを指定
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  }
}

// connectは、propsとして渡したいmapStateを引数と指定し、componentを引数に持つ関数が返ってくる
export default connect(mapStateToProps)(ExpenseList)
