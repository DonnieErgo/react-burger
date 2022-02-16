import {useState} from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import burgerIngredients from '../../utils/types'
import styles from './burger-constructor.module.css'
import OrderPrice from '../order-price/order-price'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

const BurgerConstructor = props => {

  // После того как будет реализован функционал выбора ингредиентов
  // нужно убрать shift() или модифицировать поиск булочки
  const checkAvailability = props.cart.length
  const bun = checkAvailability ? props.cart.filter(el => el.type === 'bun').shift() : []
  const mainIngredients = checkAvailability ? props.cart.filter(el => el.type !== 'bun') : []

  const [active, setActive] = useState(false)
  const togglePopup = () => setActive(!active)

  return checkAvailability && (
    <section className={`${styles.constr} mt-25`}>
      
      {active && 
        <Modal onClose={togglePopup}>
          <OrderDetails/>
        </Modal>}

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

      <OrderPrice toggle={togglePopup} items={props.cart} />

    </section>
  )
}

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerConstructor