// selectors folderの中にはreduxからstateを取得するためのquery処理を格納
import moment from 'moment'
// filterされたexpenseを取得
export default (expenses, { text, sortBy, startDate, endDate }) => {
  // 3つの要素, text, startDate, endDateによってfilter
  // それぞれmatchするか判定、3つともtrueなら全体としてもtrueを返す
  return expenses.filter(expense => {
    const createdAtMoment = moment(expense.createdAt)
    // timestamps(milliseconds): 基準日が1970-01-01 ex. 334000, 10, -203
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
    // 大文字小文字関係なくmatchするかどうか
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    // 比較関数を用いたsort
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}