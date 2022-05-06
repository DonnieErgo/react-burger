import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import Loading from '../../components/loading/loading'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients'
import styles from './ingredient-page.module.css'
import { useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TIngredient } from '../../utils/types'

export const IngredientPage: FC = () => {

  const { ingredientId } = useParams<{ ingredientId: string }>()
  const { loading, ingredients } = useAppSelector(ingredientsSelector)

  const currentIngredient = useMemo<TIngredient>(
    () => ingredients.find(item => item._id === ingredientId),
  [ingredients, ingredientId])

  return (
    <>
      {loading && <Loading />}
      {currentIngredient &&
        <section className={`${styles.container} pt-20 mt-15`}>
          <h1 className='text text_type_main-large'>Детали ингредиента</h1>
          <IngredientDetails />
        </section>
      }
    </>
  )
}