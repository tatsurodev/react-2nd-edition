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
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Selected Optoin</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOption}>
      Okay
    </button>
  </Modal>
)

export default OptionModal
