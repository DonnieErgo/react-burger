import styles from './err.module.css'

const Err = props => {
  return (
    <p className={`text text_type_main-large ${styles.error}`}> Ошибка: {props.error} </p>
  )
}

export default Err