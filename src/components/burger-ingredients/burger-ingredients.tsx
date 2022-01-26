import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from '../../utils/types'
import IngredientSection from '../ingredient-section/ingredient-section';

const BurgerIngredients = props => {

  const [current, setCurrent] = React.useState('bun')

  return (
    <section className={styles.ingredients}>

      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>

      <div className={`${styles.tab} mb-10`}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
      </div>
    
      <div className={`${styles.wrapper} custom-scroll`}>

        <IngredientSection name='Булки' ingrList={props.data.filter(prod => prod.type === 'bun')} />

        <IngredientSection name='Начинки' ingrList={props.data.filter(prod => prod.type === 'main')} />

        <IngredientSection name='Соусы' ingrList={props.data.filter(prod => prod.type === 'sauce')} />

      </div>
    
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerIngredients