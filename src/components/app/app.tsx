import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {useEffect, useState} from 'react'

const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {

  const [ingredientsData, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Нужно прописать loading в компонентах и реализовать стейт ошибки

  useEffect(() => {
    const getData = async () => {
      try { 
        const res = await fetch(ingredientsApiUrl)
        if (!res.ok) { 
          throw new Error(`Fetching ${ingredientsApiUrl} failed. Status is ${res.status}`)
        }
        let actualData = await res.json()
        setIngredients(actualData.data)
        setError(null)
      } catch(err) {
        setError(err.message)
        console.log(err.message)
        setIngredients([])
      } finally { setLoading(false) }
    }
    getData()
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={ingredientsData} />
        <BurgerConstructor cart={ingredientsData} />
      </main>
    </>
  )
}

export default App;