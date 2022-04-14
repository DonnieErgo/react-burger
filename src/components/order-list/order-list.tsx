import styles from './order-list.module.css'
import OrderItem from '../order-item/order-item'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getFeed, stopFeed } from '../../services/slices/websocket'
import { feedSelector } from '../../services/slices/feed'
import { useDispatch, useSelector } from 'react-redux'

const OrderList = ({ showStatus }) => {

  const dispatch = useDispatch()
  const { feed } = useSelector(feedSelector)

  useEffect(() => {
    dispatch(getFeed())

    return () => {
      dispatch(stopFeed())
    }
  }, [feed])

  return (
    // Проверки + убрать ковычки
    <ul className={`${styles.list} custom-scroll`}> 

      <OrderItem showStatus={showStatus} />
      <OrderItem showStatus={showStatus} />
      <OrderItem showStatus={showStatus} />
      <OrderItem showStatus={showStatus} />
      <OrderItem showStatus={showStatus} />

    </ul>
  )
}

OrderList.propTypes = {
  showStatus: PropTypes.bool.isRequired,
}

export default OrderList