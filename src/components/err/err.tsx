import styles from './err.module.css'
import { FC } from 'react'

type TError = {
  error: string,
};

const Err: FC<TError> = ({ error }) => {
  return (
    <p className={`text text_type_main-large ${styles.error}`}>{error} </p>
  )
}

export default Err