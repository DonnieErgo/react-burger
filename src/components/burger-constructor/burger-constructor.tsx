import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import burgerIngredients from '../../utils/types'
import styles from './burger-constructor.module.css'
import OrderPrice from '../order-price/order-price'

const BurgerConstructor = props => {

  const cartSize = props.cart.length

  const mainIngredients = props.cart.filter(el => el.type !== 'bun')

  return (
    <section className={`${styles.constr} mt-25`}>
      
      <div className={`${styles.ingr} ml-12 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.cart[0].name + ' (верх)'}
          price={props.cart[0].price}
          thumbnail={props.cart[0].image}/>
      </div>

      <ul className={`${styles.main} custom-scroll`}>
        {mainIngredients.map((item, index) => 
            (<li key={item._id + index} className={`${styles.ingr} mr-3 mb-4`}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}/>
            </li>)
        )}
      </ul>

      <div className={`${styles.ingr} ml-12 mb-10 mt-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.cart[cartSize-1].name + ' (низ)'}
          price={props.cart[cartSize-1].price}
          thumbnail={props.cart[cartSize-1].image}/>
      </div>

      <OrderPrice items={props.cart} />

    </section>
  )
}

// верхняя и нижния булка как отдельные компоненты тк меняется только type=top/bot и верх/низ в названии
// по-середине просто всё между булками отрисовать через мап

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerConstructor