import styles from './err.module.css'

const Err = ({ error }) => {
  return (
    <p className={`text text_type_main-large ${styles.error}`}>{error} </p>
  )
}

export default Err