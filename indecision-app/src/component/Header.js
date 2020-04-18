import React from 'react'

const Header = (props) => (
  <div>
    {/* propsにaccess */}
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
)
Header.defaultProps = {
  title: 'Indecision'
}

export default Header