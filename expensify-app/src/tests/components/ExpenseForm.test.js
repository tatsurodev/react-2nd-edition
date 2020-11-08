import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})

// formに何も入力せずにsubmitした時
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  // submitをsimulateするだけで、実際にeventが発生するわけではないのでe.preventDefault()の代わりの挙動を第二引数に指定する必要あり
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

// descriptionに値を入力した時
test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value },
  })
  expect(wrapper.state('description')).toBe(value)
})

// textareaに値を入力した時
test('should set note on textarea change', () => {
  const value = 'New ntoe value'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    persist: () => {},
    target: { value },
  })
  expect(wrapper.state('note')).toBe(value)
})

// amountに有効な値を入力した時
test('should set amount if valid input', () => {
  // htmlのinputにnumberを入力しても得られる時のtypeはstring
  const value = '23.50'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  })
  expect(wrapper.state('amount')).toBe(value)
})

// amountに無効な値を入力した時
test('should not set amount if invalid input', () => {
  const value = '12.122'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  )
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  })
  expect(wrapper.state('error')).toBe('')
  // toHaveBeenCalledWith(expense[0])とかだとidがobjectに含まれてしまうので渡すobjectを作り直す
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  })
})

test('should set new date on date change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  // wrapper.find('SingleDatePicker').prop('onDateChange')(now)
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
  const focused = false
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({
    focused,
  })
  expect(wrapper.state('calendarFocused')).toBe(focused)
})
