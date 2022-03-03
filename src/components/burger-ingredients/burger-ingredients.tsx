import { useRef, useState } from 'react';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientSection from '../ingredient-section/ingredient-section'
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'

const BurgerIngredients = () => {

  const { ingredients } = useSelector(ingredientsSelector)

  const findIngredients = (ingredientName) => ingredients.filter(prod => prod.type === ingredientName)

  const [current, setCurrent] = useState('bun')
  const scrollRef = useRef(null);
  const mainRef = useRef(null)
  const sauceRef = useRef(null)
  const bunRef = useRef(null)

  const handleTabClick = (e, ref) => {
    setCurrent(e)
    ref.current.scrollIntoView({behavior: 'smooth'})
  }

  // Подумать над мемоизацией / useEffect
  const handleScroll = () => {
    const scrollWrapPosition = scrollRef.current.getBoundingClientRect().top

    const bunDiff = Math.abs(scrollWrapPosition - bunRef.current.getBoundingClientRect().top)
    const sauceDiff = Math.abs(scrollWrapPosition - sauceRef.current.getBoundingClientRect().top)
    const maindDiff = Math.abs(scrollWrapPosition - mainRef.current.getBoundingClientRect().top)

    if (bunDiff < sauceDiff) setCurrent('bun')
    else if (sauceDiff < maindDiff) setCurrent('sauce')
    else setCurrent('main')
  }

  return ingredients && (
    <section className={styles.ingredients}>

      <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>

      <div className={`${styles.tab} mb-10`}>
        <Tab value='bun' active={current === 'bun'} onClick={e => handleTabClick(e, bunRef)}>Булки</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={e => handleTabClick(e, sauceRef)}>Соусы</Tab>
        <Tab value='main' active={current === 'main'} onClick={e => handleTabClick(e, mainRef)}>Начинки</Tab>
      </div>
    
      <div ref={scrollRef} onScroll={handleScroll} className={`${styles.wrapper} custom-scroll`}>
        <IngredientSection tabRef={bunRef} name='Булки' ingrList={findIngredients('bun')} />
        <IngredientSection tabRef={sauceRef} name='Соусы' ingrList={findIngredients('sauce')} />
        <IngredientSection tabRef={mainRef} name='Начинки' ingrList={findIngredients('main')} />
      </div>
    
    </section>
  )
}

export default BurgerIngredients