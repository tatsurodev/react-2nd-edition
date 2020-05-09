import React from 'react'
import { shallow } from 'enzyme'
// import toJSON from 'enzyme-to-json'
// react-test-rendererでrender testが可能
// shallow or full dom rendering
// import ReactShallowRenderer from 'react-test-renderer/shallow'
import Header from '../../components/Header'

test('should render Header correctly', () => {
  // enzymeのshallow(jsx)
  const wrapper = shallow(<Header />)

  // jQueryのようにfind(selector)で対象を絞り込める
  // expect(wrapper.find('h1').text()).toBe('Expensify')

  // snapshotのtest
  // snapshotの中身が詳細になりすぎるのでtoJSONでsnapshotを簡潔なものにする。
  // expect(toJSON(wrapper)).toMatchSnapshot()
  // jest.config.jsonのsnapshotSerializersでsnapshotの形式をenzyme-to-jsonに指定したのでtoJSON methodは外しておｋ
  expect(wrapper).toMatchSnapshot()

  // react-test-rendererとは、render testで使用するfacebook公式のlibrary、使いにくい
  // const renderer = new ReactShallowRenderer()
  // renderer.render(<Header />)
  // expect(renderer.getRenderOutput()).toMatchSnapshot()
})