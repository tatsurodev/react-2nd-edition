import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
  <div>
    <h1>Expensify</h1>
    {/* active linkは、activeClassNameでcustomize可能(defaultはactive)、Routeと同じくtoと部分一致する時にもactive classが付与されるので、完全一致させる時はexactを使用する */}
    <NavLink to="/dashboard" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
})

export default connect(undefined, mapDispatchToProps)(Header)
