import styles from './order-price.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CurrencyIcon from '../currency-icon/currency-icon';
import PropTypes from 'prop-types';
import burgerIngredients from '../../utils/types'

const OrderPrice = props => {

  const finalPrice = props.items.reduce((acc, it) => acc + it.price, 0)

  return(
    <div className={styles.wrapper}>
      <div className={`${styles.price} mr-10`}>
        <span className={'text text_type_digits-medium mr-2'}>{finalPrice}</span>
        <CurrencyIcon />
      </div>
      <Button onClick={props.toggle} type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

OrderPrice.propTypes = {
  items: PropTypes.arrayOf(burgerIngredients),
  toggle: PropTypes.func.isRequired
}

export default OrderPrice