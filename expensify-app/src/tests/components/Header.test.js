import React from 'react'

// react-test-rendererでrender testが可能
// shallow or full dom rendering
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from '../../components/Header'

test('should render Header correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<Header />)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})