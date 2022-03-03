import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Loading from '../loading/loading'
import Err from '../err/err'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'	
import { fetchIngredients, ingredientsSelector } from '../../services/slices/ingredients'

const App = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(ingredientsSelector)
  
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {error && <Err error={error} />}
        {loading && <Loading />}
        {!error && !loading && <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>}
      </main>
    </>
  )
}

export default App;