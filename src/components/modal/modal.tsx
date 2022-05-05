import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { useEffect, ReactNode } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

type TModalProps = {
  readonly onClose: (_?: boolean) => void;
  readonly title: string;
  readonly children: ReactNode;
}

const Modal: FC<TModalProps> = ({ onClose, title, children }) => {

  useEffect(() =>{
    const closeOnEsc = (e: KeyboardEvent) => {if (e.key === 'Escape') onClose()}
    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createPortal (
    <>
      <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`}>
        <h2 className={`${styles.title} mt-4 text text_type_main-large`}>{title}</h2>
        <div className={styles.close} onClick={() => {onClose()}}>
          <CloseIcon type='primary'/>
        </div>
        {children && children}
      </div>
      <ModalOverlay onClose={onClose} /> 
    </>
  , document.getElementById('modals')!)
}

export default Modal