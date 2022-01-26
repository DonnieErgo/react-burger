import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import dataStatic from '../../utils/data'
import cartItems from '../../utils/cartItems'

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={dataStatic} />
        <BurgerConstructor cart={cartItems}/>
      </main>
    </>
  )
}

export default App;