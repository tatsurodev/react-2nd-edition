// test時に本物のmomentをimportするとstack errorが出るので代わりにjest.requireActual
// import moment from 'moment'
const moment = jest.requireActual('moment')

// test時にprops.expenseがある時はmoment(props.expense.createdAt)が、ない時はmoment(0)が実行され、props.expenseがない時にtimestamp=0で引数が固定されることによりsnapshotのerrorがなくなる
export default (timestamp = 0) => {
  return moment(timestamp)
}
