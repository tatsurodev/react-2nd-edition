import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

// const date = new Date()
// const now = moment()
// console.log(now.format('MMM Do, YYYY'))

export default class ExpenseForm extends React.Component {
  // 親のEditExpensePageからprops.expenseを渡されている場合、props.expenseをstateの初期値にsetする、this.state = {}だとpropsにaccessできる方法がないのでconstructorを使用する
  constructor(props) {
    // thisを使用可にするため
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      // testの際、testを走らせる度moment()で得られる時間が違うためsnapshotが異なってしまうのでmockする必要あり
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    }
  }
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }
  onNoteChange = (e) => {
    // const note = e.target.value
    // eはcallbackの中で参照してもnullにresetされているので注意。前もって変数に保存しておくか、e.persist()を使用する
    e.persist()
    this.setState(() => ({ note: e.target.value }))
  }
  onAmountChange = (e) => {
    const amount = e.target.value
    // validationを実行、正規表現で最低1桁で小数第2までの数字の時state amountを更新、amountない時にstate amountをclear
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  }
  onDateChange = (createdAt) => {
    // clear防止
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }
  onSubmit = (e) => {
    e.preventDefault()
    // validation, stateのdescriptionとamountがなければ、error追加
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount' }))
    } else {
      // 正常時error clear
      this.setState(() => ({ error: '' }))
      // addExpensePage.jsのonSubmitでstate追加
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        // valueOf methodでmoment objectをtimestampに変換
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      })
    }
  }
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="number"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          block
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    )
  }
}
