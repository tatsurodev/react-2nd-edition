import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'

const AppRouter = () => (
  // BrowserRouterのchildの数は、0 or 1つのみなので、複数存在する時は<div>で括ってやる
  <BrowserRouter>
    {/* Switchで上から順にcheckし、matchした時にstop */}
    <div>
      <Header />
      <Switch>
        {/* Route componentは、match, location, historyなどのpropsを渡している */}
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/dashboard" component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        {/* path省略で常にmatch */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
