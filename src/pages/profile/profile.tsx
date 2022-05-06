import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import styles from './profile.module.css'
import { useEffect, useState } from 'react'
import { resetError, getUser, getToken } from '../../services/slices/auth'
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation'
import { ProfileInfo } from '../../components/profile-info/profile-info'
import { getCookie } from '../../utils/cookies'
import OrderList from '../../components/order-list/order-list'
import { getUserFeed, wsStop } from '../../services/slices/websocket'
import { feedSelector } from '../../services/slices/feed'
import Loading from '../../components/loading/loading'
import OrderModal from '../../components/order-modal/order-modal'
import Modal from '../../components/modal/modal'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TLocation, TOrder} from '../../utils/types'

export const Profile: FC = () => {

  const dispatch = useAppDispatch()
  const location = useLocation<TLocation>()
  const history = useHistory()
  const background = location.state && location.state.background
  const { feed } = useAppSelector(feedSelector)
  const [reversedFeed, setReverse] = useState<Array<TOrder>>([])

  useEffect(() => {
    if (feed.length > 0) setReverse([...feed].reverse())
  }, [feed])

  useEffect(() => {
    dispatch(resetError())

    if (getCookie('refreshToken') != null && getCookie('accessToken') === null) {
      dispatch(getToken()).then(_ => dispatch(getUser()))
    }

    if (getCookie('accessToken')) dispatch(getToken()).then(_ => dispatch(getUser()))
    
    dispatch(getUserFeed())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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