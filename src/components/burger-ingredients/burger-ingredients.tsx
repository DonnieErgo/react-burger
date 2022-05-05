import { useRef, useState, SetStateAction, MutableRefObject } from 'react';
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientSection from '../ingredient-section/ingredient-section'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { FC } from 'react'
import { useAppSelector } from '../../services/store'

const BurgerIngredients: FC = () => {

  const { ingredients } = useAppSelector(ingredientsSelector)

  const findIngredients = (ingredientName: string) => ingredients.filter(prod => prod.type === ingredientName)

  const [current, setCurrent] = useState<string>('bun')
  const scrollRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const sauceRef = useRef<HTMLDivElement | null>(null)
  const bunRef = useRef<HTMLDivElement | null>(null)

  const handleTabClick = (e: SetStateAction<string>, ref: MutableRefObject<HTMLDivElement>) => {
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