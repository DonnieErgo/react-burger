import { useEffect } from 'react'
import styles from './order-info.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyIcon from '../currency-icon/currency-icon'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { sendOrderInfo, ingredientsSelector, closeOrderModal, getTotalPrice } from '../../services/slices/ingredients'

const OrderInfo = () => {
  const dispatch = useDispatch()
  const { totalPrice, cartIngredients, orderName, orderModal } = useSelector(ingredientsSelector)

  useEffect(() => {
    // @ts-ignore
    dispatch(getTotalPrice())
  }, [cartIngredients])

  return(

    <div className={styles.wrapper}>

      {orderModal &&
      // @ts-ignore
      <Modal onClose={()=>{dispatch(closeOrderModal())}} title={orderName} >
        <OrderDetails />
      </Modal>}

      <div className={`${styles.price} mr-10`}>
        <span className={'text text_type_digits-medium mr-2'}>{totalPrice}</span>
        <CurrencyIcon />
      </div>
      {/*//@ts-ignore*/}
      <Button onClick={()=>{dispatch(sendOrderInfo(cartIngredients))}} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

export default OrderInfo