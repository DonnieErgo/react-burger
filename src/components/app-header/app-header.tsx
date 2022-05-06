import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FC } from 'react'

const AppHeader: FC = () => {

  const location = useLocation()
  const profileIcon = () => location.pathname !== '/profile' && location.pathname !== '/profile/orders' ? 'secondary' : 'primary'

  return (
    <header className={`${styles.header} pt-4 pb-4`}>

        <nav className={styles.navigation}> 

          <div className={styles.nav_menu}>

            <NavLink to={'/'} exact
            className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}
            activeStyle={{ color: '#F2F2F3' }}>
              <BurgerIcon type={ location.pathname === '/' ? 'primary' : 'secondary' } />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Конструктор</span>
            </NavLink>

            <NavLink to={'/feed'}
            className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}
            activeStyle={{ color: '#F2F2F3' }}>
              <ListIcon type={ location.pathname === '/feed' ? 'primary' : 'secondary' } />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Лента заказов</span>
            </NavLink>
            
          </div>
          
          <div className={styles.nav_container}>

            <Link to={'/'}> <Logo/> </Link>

            <NavLink to={'/profile'} exact
            className={`${styles.nav_link} text text_type_main-default ml-2 mr-5 ml-5`}
            activeStyle={{ color: '#F2F2F3' }}>
              <ProfileIcon type={profileIcon()} />
              <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Личный кабинет</span>
            </NavLink>

          </div>

        </nav>
    
    </header>
  )
}

export default AppHeader