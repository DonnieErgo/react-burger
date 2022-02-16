import {useState, useContext, useEffect} from 'react'
import styles from './order-info.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CurrencyIcon from '../currency-icon/currency-icon'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { Context } from '../../services/appContext'

const OrderInfo = () => {
  const { state, dispatcher } = useContext(Context)
  const [active, setActive] = useState(false)
  const [orderNumber, setOrderNumber] = useState(0)
  const [orderName, setOrderName] = useState('')
  const togglePopup = () => setActive(!active)
  const orderSubmitUrl = 'https://norma.nomoreparties.space/api/orders'
  const ingredients = state.ingredients

  const orderSubmit = async () => {
    try {
      const res = await fetch(orderSubmitUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
      })
      if (!res.ok) {
        throw new Error(`Fetching ${orderSubmitUrl} failed. Status is ${res.status}`)
      }
      const data = await res.json()
      setOrderNumber(data.order.number)
      setOrderName(data.name)
      togglePopup()
    } catch(err) {
      setOrderNumber(0)
      setOrderName('')
      console.log(err.message)
    }
  }

  useEffect(() => {
    dispatcher({type:'totalPrice'})
  }, [ingredients])

  return(

    <div className={styles.wrapper}>

      {active &&
      <Modal onClose={togglePopup} title={orderName} >
        <OrderDetails number={orderNumber} />
      </Modal>}

      <div className={`${styles.price} mr-10`}>
        <span className={'text text_type_digits-medium mr-2'}>{state.totalPrice}</span>
        <CurrencyIcon />
      </div>
      <Button onClick={orderSubmit} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

export default OrderInfo