import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import styles from './profile.module.css'
import { useEffect } from 'react'
import { resetError, getUser, getToken } from '../../services/slices/auth'
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation'
import { ProfileInfo } from '../../components/profile-info/profile-info'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../utils/cookies'
import OrderList from '../../components/order-list/order-list'
import Modal from '../../components/modal/modal'

export const Profile = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(resetError())

    if (getCookie('refreshToken') != null && !getCookie('accessToken')) {
      // @ts-ignore
      dispatch(getToken()).then(_ => dispatch(getUser()))
    }
    if (getCookie('accessToken') != null) {
      dispatch(getUser())
    }
  }, [])

  const closeModal = () => {
    history.goBack()
  }

  return (
    <div className={styles.main}>
      
      <ProfileNavigation />

      <Switch location={background || location}>

        <Route path='/profile' exact>
          <ProfileInfo />
        </Route>

        <Route path='/profile/orders' exact>
          <div className={`${styles.cont} mt-10 custom-scroll`}>
            <OrderList showStatus={true} />
          </div>
        </Route>

      </Switch>

      {/* <Modal onClose={closeModal} title={'Заказ'}>
          <OrderInfo/>
      </Modal> */}

    </div>
  )
}