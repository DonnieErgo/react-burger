import styles from './ingredient-section.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import PropTypes from 'prop-types'
import burgerIngredients from '../../utils/types'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useState } from 'react'

const IngredientSection = props => {

  const [activeIngredient, setActive] = useState(null)
  const togglePopup = itemData => setActive(itemData)

  return (
    <section ref={props.tabRef}>
      {activeIngredient && 
        <Modal onClose={togglePopup}>
          <IngredientDetails item={activeIngredient} />
        </Modal>
      }
      <h2 className={'text text_type_main-medium mb-6'}>{props.name}</h2>
      <ul className={`${styles.product_list} mb-10 ml-4 mr-1`}>
        {props.ingrList.map(it => 
        <li key={it._id} onClick={()=>{togglePopup(it)}} > 
          <BurgerIngredient item={it} /> 
        </li>)}
      </ul>
    </section>
  )
}

IngredientSection.propTypes = {
  tabRef: PropTypes.oneOfType([
    PropTypes.func, 
    // Стоит резерчнуть варианты проверки рефа на конкретный компонент, сходу не взлетело
    PropTypes.shape({ current: PropTypes.any })]),
  name: PropTypes.string,
  ingrList: PropTypes.arrayOf(burgerIngredients),
  toggle: PropTypes.func
}

export default IngredientSection