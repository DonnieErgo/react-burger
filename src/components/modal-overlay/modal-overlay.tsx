import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = props => 
<div className={styles.overlay} onClick={() => {props.onClose(false)}} />


ModalOverlay.propTypes = {
  onClose: PropTypes.any
}

export default ModalOverlay