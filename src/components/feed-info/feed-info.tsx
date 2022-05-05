import styles from './feed-info.module.css'
import { feedSelector } from '../../services/slices/feed'
import { FC } from 'react'
import { useAppSelector } from '../../services/store'
import { TOrder } from '../../utils/types'

type TFeedInfo = {
  orders: Array<TOrder>
};

const FeedInfo: FC<TFeedInfo> = ({ orders }) => {

  const { total, totalToday } = useAppSelector(feedSelector)

  return (
    <section className={`${styles.info} ml-15`}>
    <div className={`${styles.statusContainer} mb-15`}>
      <div className={`${styles.status} mr-9`}>
        <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
        <ul className={`${styles.list} custom-scroll`}>
          {orders && orders.filter(order => order.status === 'done')
            .map(order => 
              <li key={order._id} className={`${styles.order_done} text text_type_digits-default`}>{order.number}</li>
            )
          }
        </ul>
      </div>
      <div className={styles.status}>
        <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
        <ul className={`${styles.list} custom-scroll`}>
          {orders && orders.filter(order => order.status === 'pending')
            .map(order => 
              <li key={order._id} className={`text text_type_digits-default`}>{order.number}</li>
            )
          }
        </ul>
      </div>
    </div>
    <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
    <p className={`text text_type_digits-large mb-15 ${styles.highlight}`}>{total}</p>
    <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
    <p className={`text text_type_digits-large ${styles.highlight}`}>{totalToday}</p>
  </section>
  )
}

export default FeedInfo