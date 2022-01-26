import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { dataStatic } from '../../utils/data'

class App extends React.Component {
  render () {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients data={dataStatic} />
        </main>
      </>
    )
  }
}

export default App;