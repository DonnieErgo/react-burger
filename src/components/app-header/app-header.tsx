import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavItem from '../nav-item/nav-item';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>

        <nav className={styles.navigation}> 

          <div className={styles.nav_menu}>

            <NavItem text={'Конструктор'}>
              <BurgerIcon type="primary" />
            </NavItem>

            <NavItem text={'Лента заказов'}>
              <ListIcon type="secondary" />
            </NavItem>
            
          </div>
          
          <div className={styles.nav_container}>

            <a href={'#'}> <Logo/> </a>

            <NavItem text={'Личный кабинет'}>
              <ProfileIcon type="secondary" />
            </NavItem>

          </div>

        </nav>
    
    </header>
  )
}

export default AppHeader