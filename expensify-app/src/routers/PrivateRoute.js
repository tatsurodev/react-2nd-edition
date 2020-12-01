import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
  isAuthenticated,
  // props.componentはjsxでcomponentとして利用するので大文字にするとbetter
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    // Routeのhistory, locatoin等のpropsをcomponentへ渡す
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
})

export default connect(mapStateToProps)(PrivateRoute)
