import styles from './order-list.module.css'
import OrderItem from '../order-item/order-item'
import PropTypes from 'prop-types'
import { stopFeed } from '../../services/slices/websocket'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const OrderList = ({ showStatus, orders }) => {


  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(stopFeed())
    }
  }, [])

  return (
    <ul className={`${styles.link} ${styles.list} custom-scroll`}> 

      {orders && orders.map(order => (
          <OrderItem key={order._id} showStatus={showStatus} order={order} />
      ))}

    </ul>
  )
}

OrderList.propTypes = {
  showStatus: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired
}

export default OrderList