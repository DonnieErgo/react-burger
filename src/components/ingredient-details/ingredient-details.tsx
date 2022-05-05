import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { useMemo } from 'react'
import Loading from '../../components/loading/loading'
import { useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TIngredient } from '../../utils/types'

const IngredientDetails: FC = () => {

  const { ingredients, loading } = useAppSelector(ingredientsSelector)
  const { ingredientId } = useParams<{ ingredientId: string }>()

  const currentIngredient = useMemo<TIngredient>(
    () => ingredients.find(item => item._id === ingredientId),
  [ingredients, ingredientId])

  return (
    <>
      {loading && <Loading />}
      {currentIngredient && 
        <section>
          <img className={`${styles.img} mt-8`} src={currentIngredient.image} alt={currentIngredient.name}/>
          <h3 className={'text text_type_main-medium mt-8 mb-8'}>{currentIngredient.name}</h3>
          <div>
            <ul className={styles.info}>
              <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Калории,ккал
                <p className="text text_type_digits-default">{currentIngredient.calories}</p>
              </li>
              <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Белки, г
                <p className="text text_type_digits-default">{currentIngredient.proteins}</p>
              </li>
              <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Жиры, г
                <p className="text text_type_digits-default">{currentIngredient.fat}</p>
              </li>
              <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Углеводы, г
                <p className="text text_type_digits-default">{currentIngredient.carbohydrates}</p>
              </li>
            </ul>
          </div>
        </section>
      }
    </>
  )
}

export default IngredientDetails