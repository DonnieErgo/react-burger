import styles from './modal-overlay.module.css'
import { FC } from 'react'

type TModalOverlay = {
  readonly onClose: (_?: boolean) => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => 
<div className={styles.overlay} onClick={() => {onClose(false)}} />

export default ModalOverlay