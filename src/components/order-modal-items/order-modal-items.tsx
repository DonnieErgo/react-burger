import styles from './order-modal-items.module.css'
import { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../utils/types'

interface IOrderModalItems {
  ingredient: TIngredient,
}

const OrderModalItems: FC<IOrderModalItems> = ({ ingredient }) => {

  return (
    <li className={styles.ingredient}>
      <div className={styles.wrap}>
        <img className={`${styles.ingredient_icon} mr-4`} src={ingredient.image_mobile} alt='картинка'/>
        <span className={`text text_type_main-default`}>{ingredient.name}</span>
      </div>
      <div className={styles.wrap}>
        <span className={'text text_type_digits-default'}>{ingredient.count}</span>
        <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
        <span className={'text text_type_digits-default mr-2'}>{ingredient.price}</span>
        <CurrencyIcon type='primary'/>
      </div>
    </li>
  )
}

export default OrderModalItems