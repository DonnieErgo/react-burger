import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { useSelector } from 'react-redux'

const IngredientDetails = () => {

  const { ingredientDetails, cartIngredients, cartBuns } = useSelector(ingredientsSelector)
  const { ingredientId } = useParams()
  const ingredient = ingredientDetails

  return (
  <>
    <img className={`${styles.img} mt-8`} src={ingredient.image} alt={ingredient.name}/>
    <h3 className={'text text_type_main-medium mt-8 mb-8'}>{ingredient.name}</h3>
    <div>
      <ul className={styles.info}>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Калории,ккал
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Белки, г
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Жиры, г
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Углеводы, г
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  </>
  )
}

export default IngredientDetails