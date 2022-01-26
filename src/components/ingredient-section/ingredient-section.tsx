import styles from './ingredient-section.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

const IngredientSection = props => {
  return (
    <section>
      <h2 className={'text text_type_main-medium mb-6'}>{props.name}</h2>

      <ul className={`${styles.product_list} mb-10 ml-4 mr-1`}>
        {props.ingrList.map(it => <li key={it._id}> <BurgerIngredient item={it} /> </li>)}
      </ul>
    </section>
  )
}

export default IngredientSection