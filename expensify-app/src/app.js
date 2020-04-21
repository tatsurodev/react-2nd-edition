import React from 'react'
import ReactDOM from 'react-dom'
// react-routerはスマホ and web用。web用のみならreact-router-domでおｋ
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
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

const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go home</Link>
  </div>
)

const Header = () => (
  <div>
    <h1>Expensify</h1>
    {/* active linkは、activeClassNameでcustomize可能(defaultはactive)、Routeと同じくtoと部分一致する時にもactive classが付与されるので、完全一致させる時はexactを使用する */}
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
  </div>
)

const routes = (
  // BrowserRouterのchildの数は、0 or 1つのみなので、複数存在する時は<div>で括ってやる
  <BrowserRouter>
    {/* Switchで上から順にcheckし、matchした時にstop */}
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        {/* path省略で常にmatch */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'))
