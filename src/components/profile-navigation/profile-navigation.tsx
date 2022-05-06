import styles from './profile-navigation.module.css'
import { NavLink } from 'react-router-dom'
import { logoutRequest } from '../../services/slices/auth'
import { useAppDispatch } from '../../services/store'
import { FC } from 'react'

export const ProfileNavigation: FC = () => {

  const dispatch = useAppDispatch()

  const onLogOut = () => {
    dispatch(logoutRequest())
  }
  
  return (
    <section className={`${styles.nav_menu} mt-30 ml-5`}>
    <NavLink
      to='/profile' exact 
      className={`${styles.nav_link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}>
        Профиль
      </NavLink>
      <NavLink
      to='/profile/orders' exact 
      className={`${styles.nav_link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}>
        История заказов
      </NavLink>
      <NavLink
      to='/login' exact 
      className={`${styles.nav_link} text text_type_main-medium text_color_inactive`}
      activeStyle={{ color: '#F2F2F3' }}
      onClick={onLogOut}>
        Выход
      </NavLink>
      <span className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете
      изменить свои персональные данные и посмотреть историю заказов</span>
  </section>
  )
}