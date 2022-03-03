import styles from './burger-ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredientDetails, ingredientsSelector } from '../../services/slices/ingredients'

const BurgerIngredient = ({ item }) => {

  const { cartIngredients } = useSelector(ingredientsSelector)

  const count = cartIngredients.filter(i => i._id === item._id).length

  const dispatch = useDispatch()

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item
  })

  return (
    <li ref={dragRef} onClick={()=>{dispatch(showIngredientDetails(item))}} >
      <a className={`${styles.link} mb-8`} href='#'>
        <img className='pr-4 pl-4 mb-1' src={item.image} alt={item.name}/>
        <div className={`${styles.price} mb-2`}>
          <p className={'text text_type_digits-default pr-2'}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.name} text text_type_main-default`}>{item.name}</h3>
        {count > 0 && <Counter count={count} size='default' />}
      </a>
    </li>
  )
}

BurgerIngredient.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
}

export default BurgerIngredient;