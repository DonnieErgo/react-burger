import styles from './err.module.css'
import PropTypes from 'prop-types'

const Err = ({ error }) => {
  return (
    <p className={`text text_type_main-large ${styles.error}`}>{error} </p>
  )
}

Err.propTypes = {
  error: PropTypes.string
}

export default Err