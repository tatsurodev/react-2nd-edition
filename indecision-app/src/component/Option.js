// 直接的にはReactは使用されていないが、JSXはReact.createElement methodによって変換されるため必要
import React from 'react'

// export default () => (jsx)だと、chromeのextensionでunknown componentとなるので変数宣言したのちexport defaultした方がbetter
const Option = (props) => (
  <div>
    {props.optionText}
    <button
      className="button button--link"
      // handleDeleteOptionだとeを引数にしてしまうので、無名関数内でhandleDeleteOptionに引数を持たせる
      // onClick={props.handleDeleteOption}
      onClick={
        (e) => {
          props.handleDeleteOption(props.optionText)
        }
      }
    >
      remove
      </button>
  </div>
)

export default Option