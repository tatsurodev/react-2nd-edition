import React from 'react'
import ReactDOM from 'react-dom'
// react-routerはスマホ and web用。web用のみならreact-router-domでおｋ
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const ExpenseDashboardPage = () => (
  <div>
    This is from my dashboard component
  </div>
)

const AddExpensePage = () => (
  <div>
    This is from my add expense component
  </div>
)

const EditExpensePage = () => (
  <div>
    This is from my edit expense component
  </div>
)

const HelpPage = () => (
  <div>
    This is from my help component
  </div>
)

const routes = (
  // BrowserRouterのchildの数は、0 or 1つのみなので、複数存在する時は<div>で括ってやる
  <BrowserRouter>
    <div>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
    </div>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'))
