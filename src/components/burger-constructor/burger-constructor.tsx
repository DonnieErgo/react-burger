import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import OrderInfo from '../order-info/order-info'
import ConstructorItem from '../constructor-item/constructor-item'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { ingredientsSelector, addIngredientToCart, addBunsToCart } from '../../services/slices/ingredients'

const BurgerConstructor = () => {

  const dispatch = useDispatch()
  const { cartIngredients, cartBuns } = useSelector(ingredientsSelector)
  const cartBun = cartBuns[0]

  const [{isOver}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
    // @ts-ignore
      if (item.type === 'bun') dispatch(addBunsToCart(item))
      else dispatch(addIngredientToCart(item)) 
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <section
      ref={dropTarget}
      className={`${styles.constr} mt-25`} 
      style={{outline: isOver ? '2px solid #4C4CFF' : 'none'}}>

      {cartBun && <div className={`${styles.ingr} ml-12 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={cartBun.name + ' (верх)'}
          price={cartBun.price}
          thumbnail={cartBun.image}/>
      </div>}

      <ul className={`${styles.main} custom-scroll`}>
        {cartIngredients.length !== 0 && cartIngredients.map((item, index) => 
        // @ts-ignore
          <ConstructorItem item={item} index={index} key={item.id} />
        )}
      </ul>

      {cartBun && <div className={`${styles.ingr} ml-12 mb-6`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={cartBun.name + ' (низ)'}
          price={cartBun.price}
          thumbnail={cartBun.image}/>
      </div>}

      { cartIngredients.length === 0 &&
        <span className='text text_type_main-medium'>Перетащите сюда ингредиенты</span> }

      { cartBuns.length === 0 &&
        <span className='text text_type_main-medium'>Начать лучше с булочки {'\u2728'}</span> }

      { (cartIngredients.length >= 1 && cartBuns.length >= 1) &&
        <OrderInfo /> }

    </section>
  )
}

export default BurgerConstructor