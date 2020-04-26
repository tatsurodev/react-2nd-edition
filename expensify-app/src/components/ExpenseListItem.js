import React from 'react'

// 引数propsをdestructure
const ExpenseListItem = ({ description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
  </div>
)

export default ExpenseListItem