import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { ingredientsSelector, setIngredient } from '../../services/slices/ingredients'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const IngredientPage = () => {

  const dispatch = useDispatch()
  const { ingredientDetails, cartIngredients, cartBuns } = useSelector(ingredientsSelector)
  const { ingredientId } = useParams()

  useEffect(() => {
    if (ingredientId && !ingredientDetails) {
      const ingrToUse = cartIngredients.concat(cartBuns).find(ingr => ingr._id === ingredientId)
      dispatch(setIngredient(ingrToUse))
    }
  }, [ingredientId])

  return (
    <section className="pt-20 mt-15">
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </section>
  )
}