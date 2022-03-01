import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import OrderInfo from '../order-info/order-info'
import ConstructorItem from '../constructor-item/constructor-item'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { nanoid } from 'nanoid'
import { ingredientsSelector, addIngredientToCart, deleteIngredientFromCart } from '../../services/slices/ingredients'

const BurgerConstructor = () => {

  const dispatch = useDispatch()
  const { cartIngredients } = useSelector(ingredientsSelector)
  const cartBun = cartIngredients.find(item => item.type === 'bun')
  const cartOther = cartIngredients.filter(item => item.type !== 'bun')

  const [{isOver}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item:{type: string, _id: string}) => {
      if (item.type === 'bun') {
        dispatch(deleteIngredientFromCart(item))
        dispatch(addIngredientToCart(item))
      } else { dispatch(addIngredientToCart(item)) }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <section ref={dropTarget} className={`${styles.constr} mt-25`} 
      style={{outline: isOver ? '2px solid #4C4CFF' : 'none'}}>

      { (cartIngredients.length === 0) &&
        <span className='text text_type_main-medium'> Перетащите сюда ингредиенты </span> }

      {cartBun && <div className={`${styles.ingr} ml-12 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={cartBun.name + ' (верх)'}
          price={cartBun.price}
          thumbnail={cartBun.image}/>
      </div>}

      <ul className={`${styles.main} custom-scroll`}>
        {cartOther.length !== 0 && cartOther.map((item, index) => 
          <ConstructorItem item={item} index={index} key={nanoid()} />
        )}
      </ul>

      {cartBun && <div className={`${styles.ingr} ml-12 mb-10 mt-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={cartBun.name + ' (низ)'}
          price={cartBun.price}
          thumbnail={cartBun.image}/>
      </div>}

      { cartIngredients.length >= 1 && <OrderInfo />}

    </section>
  )
}

export default BurgerConstructor