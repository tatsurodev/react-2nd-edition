import React from 'react'
import { connect } from 'react-redux'
import { DataRangePicker, DateRangePicker } from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate))
    this.props.dispatch(setEndDate(endDate))
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            this.props.dispatch(setTextFilter(e.target.value))
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={e => {
            if (e.target.value === 'date') {
              this.props.dispatch(sortByDate())
            } else if (e.target.value === 'amount') {
              this.props.dispatch(sortByAmount())
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          // xマークでclear
          showClearDates={true}
          // 過去選択可
          numberOfMonths={1}
          isOutsideRange={() => false}
          // 必須項目、inputのid, name等に使用される、適当でおｋ
          startDateId="start"
          endDateId="end"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

// ExpenseListFiltersでpropsにaccessする必要があるのでmapStateToPropsを定義する必要があるが、なければ必要ない
export default connect(mapStateToProps)(ExpenseListFilters)