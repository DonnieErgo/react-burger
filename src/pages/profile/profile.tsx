import { Switch, Route } from 'react-router-dom'
import styles from './profile.module.css'
import { useEffect } from 'react'
import { resetError, authSelector } from '../../services/slices/auth'
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation'
import { ProfileInfo } from '../../components/profile-info/profile-info'
import { useDispatch, useSelector } from 'react-redux'

export const Profile = () => {

  const dispatch = useDispatch()
  const { requestSuccess } = useSelector(authSelector)

  useEffect(() => {
    dispatch(resetError())
  }, [])

  return (
    <div className={styles.main}>
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