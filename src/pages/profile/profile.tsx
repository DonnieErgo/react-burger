import { Redirect, Link, NavLink, Switch, Route } from 'react-router-dom'
import styles from './profile.module.css'
import { useState, useEffect } from 'react'
import { resetError, authSelector, resetRequestingLogin } from '../../services/slices/auth'
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation'
import { ProfileInfo } from '../../components/profile-info/profile-info'
import { useDispatch, useSelector } from 'react-redux'

export const Profile = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetRequestingLogin())
    dispatch(resetError())
  }, [])

  return (
    <div className={`${styles.main} mt-30 ml-85`}>
      <ProfileNavigation />
      <Switch>
        <Route path="/profile" exact>
          <ProfileInfo />
        </Route>
        <Route path="/profile/orders" exact>
          <span className={'text_type_main-default mt-0'}>Скоро здесь будет лента заказов...</span>
        </Route>
      </Switch>
    </div>
  )
}