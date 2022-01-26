import styles from './nav-item.module.css';
import PropTypes from 'prop-types';

const NavItem = props => {
  return (
    <div className={`mr-2`}>
      <a className={`${styles.nav_link} mr-5 ml-5`} href={'#'}>
        {props.children}
        <span className="text text_type_main-default ml-2">{props.text}</span>
      </a>
    </div>
  )
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default NavItem;