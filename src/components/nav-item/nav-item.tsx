import styles from './nav-item.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavItem = ({ text, children, route }) => {
  return (
    <>
      <NavLink to={route} className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}>
        {children}
        {text}
      </NavLink>
    </>
  )
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  route: PropTypes.string.isRequired
}

export default NavItem;