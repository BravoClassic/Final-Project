import React from "react";
import "../assets/css/modal.css";
import PropTypes from "prop-types";
import FormComponent from "./FormComponent";


const Modal = (props) => {
  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-container" >
      <div className="modal" id="modal">
        <h2>{props.title}</h2>
        <div className="content h-full flex flex-wrap justify-center items-center">
          <FormComponent isCreateAccount={props.isCreateAccount} />
        </div>
        <div className="actions">
          <button className="toggle-button" onClick={ (e) => {e.stopPropagation();onClose(e)}}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  isCreateAccount: PropTypes.bool
};

export default Modal;