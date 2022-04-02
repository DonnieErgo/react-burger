import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>

        <nav className={styles.navigation}> 

          <div className={styles.nav_menu}>

            <NavLink to={'/'} className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}>
              <BurgerIcon type="primary" />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Конструктор</span>
            </NavLink>

            <NavLink to={'/feed'} className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}>
              <ListIcon type="secondary" />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Лента заказов</span>
            </NavLink>
            
          </div>
          
          <div className={styles.nav_container}>

            <Link to={'/'}> <Logo/> </Link>

            <NavLink to={'/profile'} className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}>
              <ProfileIcon type="secondary" />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Личный кабинет</span>
            </NavLink>

          </div>

        </nav>
    
    </header>
  )
}

export default AppHeader