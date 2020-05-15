import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <div>
    <h1>Expensify</h1>
    {/* active linkは、activeClassNameでcustomize可能(defaultはactive)、Routeと同じくtoと部分一致する時にもactive classが付与されるので、完全一致させる時はexactを使用する */}
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
  </div>
)

export default Header