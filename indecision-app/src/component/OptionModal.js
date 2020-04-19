import React from 'react'
import Modal from 'react-modal'

// screenreader用にroot appを指定することが必須
Modal.setAppElement('#app')

const OptionModal = (props) => (
  <Modal
    // isOpen, contentLabelは必須項目
    // open or close、!!で値をboolean化
    isOpen={!!props.selectedOption}
    // screenreader用に必須
    contentLabel="Selected Option"
    // esc keyを押す、また画面上のoverlayをclickした時に行うcallback
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3>Selected Optoin</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button
      onClick={props.handleClearSelectedOption}
    >Okay</button>
  </Modal>
)

export default OptionModal