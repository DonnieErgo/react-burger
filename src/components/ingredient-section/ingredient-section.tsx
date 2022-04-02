import styles from './ingredient-section.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient'

const IngredientSection = ({ tabRef, name, ingrList }) => {

  return (
    <section ref={tabRef}>
      <h2 className={'text text_type_main-medium mb-6'}>{name}</h2>
      <ul className={`${styles.product_list} mb-10 ml-4 mr-1`}>
        {ingrList.map(it => <BurgerIngredient item={it} key={it._id} />)}
      </ul>
    </section>
  )
}

export default IngredientSection