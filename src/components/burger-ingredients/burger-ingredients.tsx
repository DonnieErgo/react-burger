import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from '../../utils/types'
import IngredientSection from '../ingredient-section/ingredient-section'

const BurgerIngredients = props => {

  const findIngredients = (ingredientName) => props.data.filter(prod => prod.type === ingredientName)

  const [current, setCurrent] = useState('bun')
  const mainRef = useRef(null)
  const sauceRef = useRef(null)
  const bunRef = useRef(null)

  const handleTabClick = (e, ref) => {
    setCurrent(e)
    ref.current.scrollIntoView({behavior: 'smooth'})
  }

  return props.data.length && (
    <section className={styles.ingredients}>

      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>

      <div className={`${styles.tab} mb-10`}>
        <Tab value='bun' active={current === 'bun'} onClick={e => handleTabClick(e, bunRef)}>Булки</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={e => handleTabClick(e, sauceRef)}>Соусы</Tab>
        <Tab value='main' active={current === 'main'} onClick={e => handleTabClick(e, mainRef)}>Начинки</Tab>
      </div>
    
      <div className={`${styles.wrapper} custom-scroll`}>
        <IngredientSection tabRef={bunRef} name='Булки' ingrList={findIngredients('bun')} />
        <IngredientSection tabRef={sauceRef} name='Соусы' ingrList={findIngredients('sauce')} />
        <IngredientSection tabRef={mainRef} name='Начинки' ingrList={findIngredients('main')} />
      </div>
    
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerIngredients)
}

export default BurgerIngredients