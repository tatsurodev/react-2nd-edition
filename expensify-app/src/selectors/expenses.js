// selectors folderの中にはreduxからstateを取得するためのquery処理を格納
// filterされたexpenseを取得
export default (expenses, { text, sortBy, startDate, endDate }) => {
  // 3つの要素, text, startDate, endDateによってfilter
  // それぞれmatchするか判定、3つともtrueなら全体としてもtrueを返す
  return expenses.filter(expense => {
    // timestamps(milliseconds): 基準日が1970-01-01 ex. 334000, 10, -203
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    // 大文字小文字関係なくmatchするかどうか
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    // 比較関数を用いたsort
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amoount ? 1 : -1
    }
  })
}