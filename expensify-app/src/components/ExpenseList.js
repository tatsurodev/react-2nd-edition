import React from 'react'
import { connect } from 'react-redux'

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.filters.text}
    {props.expenses.length}
  </div>
)

// propsにmapするstateを指定
const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    filters: state.filters
  }
}

// connectは、propsとして渡したいmapStateを引数と指定し、componentを引数に持つ関数が返ってくる
export default connect(mapStateToProps)(ExpenseList)