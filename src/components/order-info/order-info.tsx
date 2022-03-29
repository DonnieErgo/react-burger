import { useEffect, useState } from 'react'
import styles from './order-info.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyIcon from '../currency-icon/currency-icon'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { sendOrderInfo, ingredientsSelector, closeOrderModal } from '../../services/slices/ingredients'

const OrderInfo = () => {
  const { cartIngredients, orderName, orderModal, cartBuns } = useSelector(ingredientsSelector)
  const dispatch = useDispatch()
  const [price, setPrice] = useState(0)

  // Подумать над мемоизацией

  const getPrice = () => {
    let total
    const hasIngredients = cartIngredients.length > 0
    const hasBuns = cartBuns.length > 0
    if (hasIngredients || hasBuns ) {
      total = (hasIngredients ? cartIngredients.reduce((a,i) => a + i.price, 0) : 0) + 
        (hasBuns ? cartBuns[0].price * 2 : 0)
    } else { total = 0 }
    setPrice(total)
  }

  const addOrder = () => {
    // Не бейте, это временная заглушка
    const order = cartIngredients.concat(cartBuns.concat(cartBuns))
    // @ts-ignore
    dispatch(sendOrderInfo(order))
  }

  useEffect(() => {
    // @ts-ignore
    getPrice()
  }, [cartIngredients, cartBuns])

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
      <Button onClick={()=>{addOrder()}} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

export default OrderInfo