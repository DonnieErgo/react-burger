import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import styles from './profile.module.css'
import { useEffect, useState } from 'react'
import { resetError, getUser, getToken } from '../../services/slices/auth'
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation'
import { ProfileInfo } from '../../components/profile-info/profile-info'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../../utils/cookies'
import OrderList from '../../components/order-list/order-list'
import { getUserFeed } from '../../services/slices/websocket'
import { feedSelector } from '../../services/slices/feed'
import Loading from '../../components/loading/loading'
import OrderModal from '../../components/order-modal/order-modal'
import Modal from '../../components/modal/modal'

export const Profile = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const background = location.state && location.state.background
  const { feed } = useSelector(feedSelector)
  const [reversedFeed, setReverse] = useState([])

  useEffect(() => {
    if (feed.length > 0) setReverse([...feed].reverse())
  }, [feed])

  useEffect(() => {
    dispatch(resetError())

    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      // @ts-ignore
      dispatch(getToken()).then(_ => dispatch(getUser()))
    }

    if (getCookie('accessToken')) dispatch(getUser())
    
    dispatch(getUserFeed())
  }, [])

  const closeModal = () => {
    history.goBack()
  }

  return (
    <div className={styles.main}>
      <Switch location={background || location}>
        <Route path={'/profile/orders/:orderId'} exact>
          <OrderModal/>
        </Route>
      
        <Route path ={'/'}>
          <ProfileNavigation />

          <Switch location={background || location}>

            <Route path='/profile' exact>
              <ProfileInfo />
            </Route>

            <Route path='/profile/orders' exact>
              {feed === [] && <Loading />}
              {feed && 
                <div className={`${styles.cont} mt-10 custom-scroll`}>
                  <OrderList showStatus={true} orders={reversedFeed} />
                </div>
              }
            </Route>
          </Switch>
        </Route>
      </Switch>

          {background && <Route path='/profile/orders/:orderId' exact>
            <Modal onClose={closeModal} title={''}>
              <OrderModal/>
            </Modal>
          </Route>}
    </div>
  )
}