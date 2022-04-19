import styles from './feed.module.css'
import Loading from '../../components/loading/loading'
import OrderList from '../../components/order-list/order-list'
import FeedInfo from '../../components/feed-info/feed-info'
import { useEffect } from 'react'
import { getFeed } from '../../services/slices/websocket'
import { feedSelector } from '../../services/slices/feed'
import { useDispatch, useSelector } from 'react-redux'
import { wsSelector } from '../../services/slices/websocket'

export const Feed = () => {

  const dispatch = useDispatch()
  const { feed } = useSelector(feedSelector)
  const { wsHasConnected } = useSelector(wsSelector)

  useEffect(() => {
    if (!wsHasConnected) dispatch(getFeed())
  }, [feed])

  return (
    <>
      {feed.length === 0 && <Loading />}

      {feed.length > 0 && 
        <main className={styles.main}>

          <h1 className='text text_type_main-large ml-5 mb-5'>Лента заказов</h1>
          <div className={`${styles.container}`}>

            <section className={`${styles.orders} custom-scroll ml-5`}>
              <OrderList orders={feed} showStatus={false} />
            </section>

            <FeedInfo orders={feed} />

          </div>
        </main>
      }
    </>
  )
}