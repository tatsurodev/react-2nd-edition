// expenses reducer
const expensesReducerDefaultState = []
export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // state.pushは破壊的で処理後のlengthを返すので正常に処理できない、concatは配列に追加すして写像を返す
      // return state.concat(action.expense)
      // es6 spread operatorで配列に追加
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}