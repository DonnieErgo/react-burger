import styles from './order-list.module.css'
import OrderItem from '../order-item/order-item'
import { stopFeed } from '../../services/slices/websocket'
import { useEffect } from 'react'
import { useAppDispatch } from '../../services/store'
import { FC } from 'react'
import { TOrder} from '../../utils/types'

type TOrderList = {
  readonly showStatus: boolean;
  readonly orders: Array<TOrder>
};

const OrderList: FC<TOrderList> = ({ showStatus, orders }) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(stopFeed())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ul className={`${styles.link} ${styles.list} custom-scroll`}> 

      {orders && orders.map(order => (
          <OrderItem key={order._id} showStatus={showStatus} order={order} />
      ))}

    </ul>
  )
}

export default OrderList