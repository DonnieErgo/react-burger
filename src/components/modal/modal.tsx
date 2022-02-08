import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = props => {

  useEffect(() =>{
    const closeOnEsc = e => {if (e.key === 'Escape') props.onClose()}
    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, [])

  return createPortal (
    <>
      <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`}>
        <div className={styles.close} onClick={() => {props.onClose()}}>
          <CloseIcon type="primary"/>
        </div>
        {props.children}
      </div>
      <ModalOverlay {...props} /> 
    </>
  , document.getElementById('modals')!)
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal