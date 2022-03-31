import styles from './home.module.css'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import Loading from '../../components/loading/loading'
import Err from '../../components/err/err'
import { useEffect } from 'react'
import { resetRequestingRegister } from '../../services/slices/auth'
import { useSelector, useDispatch } from 'react-redux'	
import { ingredientsSelector } from '../../services/slices/ingredients'

export const Home = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(ingredientsSelector)

  useEffect(() => {
    dispatch(resetRequestingRegister())
  }, [])

  return (
    <main className={styles.main}>
    {error && <Err error={error} />}
    {loading && <Loading />}
    {!error && !loading && 
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    }
  </main>
  )
}