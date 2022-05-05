import { useMemo } from 'react'
import styles from './order-info.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyIcon from '../currency-icon/currency-icon'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useHistory } from 'react-router-dom'
import { sendOrderInfo, ingredientsSelector, closeOrderModal } from '../../services/slices/ingredients'
import { authSelector } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { FC } from 'react'

const OrderInfo: FC = () => {

  const dispatch = useAppDispatch()
  const history = useHistory()
  const { auth } = useAppSelector(authSelector)
  const { cartIngredients, orderName, orderModal, cartBuns } = useAppSelector(ingredientsSelector)

  const fullPrice = useMemo<number>(() => {
    let total: number
    const hasIngredients: boolean = cartIngredients.length > 0
    const hasBuns: boolean = cartBuns.length > 0
    if (hasIngredients || hasBuns ) {
      total = (hasIngredients ? cartIngredients.reduce((a,i) => a + i.price, 0) : 0) + 
        (hasBuns ? cartBuns[0].price * 2 : 0)
    } else { total = 0 }
    return total
  }, [cartIngredients, cartBuns])

  const addOrder = () => {
    if (auth) {
    const order = cartIngredients.concat(cartBuns.concat(cartBuns))
    dispatch(sendOrderInfo(order))
    } else { history.replace({ pathname: '/login' }) }
  }

  return(
    <div className={styles.wrapper}>

      {orderModal &&
      <Modal onClose={()=>{dispatch(closeOrderModal())}} title={orderName} >
        <OrderDetails />
      </Modal>}

      <div className={`${styles.price} mr-10`}>
        <span className={'text text_type_digits-medium mr-2'}>{fullPrice}</span>
        <CurrencyIcon />
      </div>
      <Button onClick={()=>{addOrder()}} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

export default OrderInfo