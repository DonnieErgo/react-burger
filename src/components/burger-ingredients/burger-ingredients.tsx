import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from '../../utils/types'
import IngredientSection from '../ingredient-section/ingredient-section';

const BurgerIngredients = props => {

  const [current, setCurrent] = React.useState('bun')

  const findIngredients = (ingredientName) => props.data.filter(prod => prod.type === ingredientName)

  return (
    <section className={styles.ingredients}>

      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>

      <div className={`${styles.tab} mb-10`}>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
      </div>
    
      <div className={`${styles.wrapper} custom-scroll`}>

        <IngredientSection name='Начинки' ingrList={findIngredients('main')} />

        <IngredientSection name='Соусы' ingrList={findIngredients('sauce')} />

        <IngredientSection name='Булки' ingrList={findIngredients('bun')} />

      </div>
    
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerIngredients