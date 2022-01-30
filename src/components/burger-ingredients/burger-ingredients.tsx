import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from '../../utils/types'
import IngredientSection from '../ingredient-section/ingredient-section';

const BurgerIngredients = props => {

  const findIngredients = (ingredientName) => props.data.filter(prod => prod.type === ingredientName)

  const [current, setCurrent] = React.useState('main')
  const mainRef = useRef()
  const sauceRef = useRef()
  const bunRef = useRef()

  const handleTabClick = (e, ref) => {
    setCurrent(e)
    ref.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <section className={styles.ingredients}>

      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>

      <div className={`${styles.tab} mb-10`}>
        <Tab value='main' active={current === 'main'} onClick={e => handleTabClick(e, mainRef)}>Начинки</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={e => handleTabClick(e, sauceRef)}>Соусы</Tab>
        <Tab value='bun' active={current === 'bun'} onClick={e => handleTabClick(e, bunRef)}>Булки</Tab>
      </div>
    
      <div className={`${styles.wrapper} custom-scroll`}>

        <IngredientSection tabRef={mainRef} name='Начинки' ingrList={findIngredients('main')} />

        <IngredientSection tabRef={sauceRef} name='Соусы' ingrList={findIngredients('sauce')} />

        <IngredientSection tabRef={bunRef} name='Булки' ingrList={findIngredients('bun')} />

      </div>
    
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerIngredients