import styles from './burger-ingredient.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { Link, useLocation } from 'react-router-dom'
import { FC } from 'react'
import { TLocation, TIngredient } from '../../utils/types'
import { useAppSelector } from '../../services/store'

type TIngredientProps = {
  readonly item: TIngredient
};

const BurgerIngredient: FC<TIngredientProps> = ({ item }) => {

  const { cartIngredients, cartBuns } = useAppSelector(ingredientsSelector)
  const count = cartIngredients.concat(cartBuns).filter(i => i._id === item._id).length
  const location = useLocation<TLocation>()

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item
  })

  return (

    <li>
      <Link ref={dragRef} className={styles.link_wrap}
      to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }}>
        <div className={`${styles.link} mb-8`}>
          <img className='pr-4 pl-4 mb-1' src={item.image} alt={item.name}/>
          <div className={`${styles.price} mb-2`}>
            <p className={'text text_type_digits-default pr-2'}>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <h3 className={`${styles.name} text text_type_main-default`}>{item.name}</h3>
          {count > 0 && <Counter count={count} size='default' />}
        </div>
      </Link>
    </li>
    
  )
}

export default BurgerIngredient;