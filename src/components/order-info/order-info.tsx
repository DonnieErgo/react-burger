import { useEffect, useState } from 'react'
import styles from './order-info.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyIcon from '../currency-icon/currency-icon'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { sendOrderInfo, ingredientsSelector, closeOrderModal, getTotalPrice } from '../../services/slices/ingredients'

const OrderInfo = () => {
  const { cartIngredients, orderName, orderModal } = useSelector(ingredientsSelector)
  const dispatch = useDispatch()
  const [price, setPrice] = useState(0)

  // Подумать над мемоизацией

  const getPrice = () => {
    let total
    if (cartIngredients.length > 0) {
      total = (cartIngredients.filter(i => i.type !== 'bun').reduce((a,i) => a + i.price, 0)) + 
        (cartIngredients.some(i => i.type === 'bun') ? (cartIngredients.find(i => i.type === 'bun').price * 2) : 0)
    } else { total = 0 }
    setPrice(total)
  }

  useEffect(() => {
    // @ts-ignore
    getPrice()
  }, [cartIngredients])

  return(

    <div className={styles.wrapper}>

      {orderModal &&
      // @ts-ignore
      <Modal onClose={()=>{dispatch(closeOrderModal())}} title={orderName} >
        <OrderDetails />
      </Modal>}

      <div className={`${styles.price} mr-10`}>
        <span className={'text text_type_digits-medium mr-2'}>{price}</span>
        <CurrencyIcon />
      </div>
      {/*//@ts-ignore*/}
      <Button onClick={()=>{dispatch(sendOrderInfo(cartIngredients))}} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

export default OrderInfo