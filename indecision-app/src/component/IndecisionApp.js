import React from 'react'
import Header from './Header'
import Action from './Action'
import AddOption from './AddOption'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }
  // 親のstateを子要素から変更させる必要があるので、propsとしてstateを変更するfunctionを渡す
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  }
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({ options: prevState.options.filter((option) => option !== optionToRemove) }))
    // console.log('hdo', optionToRemove)
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[Math.floor(randomNum)]
    this.setState(() => ({ selectedOption: option }))
  }
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }
    // pushは破壊的なのでprevStateで使わない
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
  }
  // lifecycle methodはclass base componentのみ、stateless functional componentにはない機能
  componentDidMount() {
    // jsonの形式が間違っていたりするとエラーが出るので
    try {
      // localStorageに保存したものを取り出すには、string形式のものをparseする
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if (options) {
        this.setState(() => ({ options }))
      }
    } catch (e) {
      // エラー時は何もしない、つまりdefaultのprops.options = []が使われる
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      // localStorageに保存するにはまずstringにしないとダメ
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount!')
  }
  render() {
    const subtitle = "Put your life in the hands of a computer"

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              // 親要素のstateを変更するhandleDeleteOptions functionを子要素にpropsとして渡す
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    )
  }
}