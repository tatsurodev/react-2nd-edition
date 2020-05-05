import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter } from '../actions/filters'

const ExpenseListFilters = (props) => (
  <div>
    <input type="text" value={props.filters.text} onChange={(e) => {
      props.dispatch(setTextFilter(e.target.value))
    }} />
  </div>
)

const mapStateToProps = (state) => ({
  filters: state.filters
})

// ExpenseListFiltersでpropsにaccessする必要があるのでmapStateToPropsを定義する必要があるが、なければ必要ない
export default connect(mapStateToProps)(ExpenseListFilters)