import { useContext } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import OrderInfo from '../order-info/order-info'
import { Context } from '../../services/appContext'

const BurgerConstructor = () => {

  const { state } = useContext(Context)
  const ingredients = state.ingredients

  const checkAvailability = ingredients.length
  const bun = checkAvailability ? ingredients.find(el => el.type === 'bun') : []
  const mainIngredients = checkAvailability ? ingredients.filter(el => el.type !== 'bun') : []

  return checkAvailability && (
    <section className={`${styles.constr} mt-25`}>

      <div className={`${styles.ingr} ml-12 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + ' (верх)'}
          price={bun.price}
          thumbnail={bun.image}/>
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
          text={bun.name + ' (низ)'}
          price={bun.price}
          thumbnail={bun.image}/>
      </div>

      <OrderInfo />

    </section>
  )
}

export default BurgerConstructor