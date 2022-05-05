import styles from './order-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getStatus, getDate } from '../../utils/utils'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { nanoid } from '@reduxjs/toolkit'
import { Link, useLocation } from 'react-router-dom'
import { FC } from 'react'
import { TLocation, TIngredient, TOrder} from '../../utils/types'
import { useAppSelector } from '../../services/store'

type TOrderItem = {
  showStatus: boolean;
  order: TOrder;
};

const OrderItem: FC<TOrderItem> = ({ showStatus, order }) => {

  const location = useLocation<TLocation>()
  const { ingredients } = useAppSelector(ingredientsSelector)
  let totalPrice: number = 0
  let ingredientImgs: Array<string> = []
  const tooManyIngredients: boolean = order.ingredients.length > 6

  order.ingredients.forEach(item => {
    let ingr: TIngredient = ingredients.find(el => el._id === item)
    if (!ingr) return

    ingredientImgs.push(ingr.image_mobile)
    totalPrice += ingr.price
  })

  return (

      <li>
        <Link to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }} className={`${styles.item} mb-4 mr-2`}>
          <div className={`${styles.header_info} mb-6`}>
            <span className={`${styles.id} text_type_digits-default`}>#{order.number}</span>
            <time className={`${styles.date} text text_color_inactive text_type_main-default`}>{getDate(order.createdAt)}</time>
          </div>
          <h2 className={`text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}>{order.name}</h2>
          {showStatus && <span className={`text text_type_main-default mb-6 ${order.status === 'done' ? styles.order_done : 'text_color_primary'}`}>
            {getStatus(order.status)}</span> }
          <div className={styles.container}>
            <div className={styles.icons}>
              {ingredientImgs.slice(0, 6).map((img, index) => (
                <img
                  className={`${styles.icon} ${index === 5 && tooManyIngredients && styles.otherIcons}`}
                  src={img} key={nanoid()} style={{zIndex: 10 - index}} alt='картинка'/>
              ))}
              {tooManyIngredients && 
                <div className={`text text_type_main-default ${styles.otherIngr}`}>+{order.ingredients.length - 6}</div>
              }
            </div>
            <div className={styles.price}>
              <span className={'text text_type_digits-default'}>{totalPrice}</span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </Link>
      </li>

  )
}

export default OrderItem