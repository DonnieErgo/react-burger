import styles from './burger-ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerIngredient = props => {
  return (
    <a className={`${styles.link} mb-8`} href='#'>
      <img className='pr-4 pl-4 mb-1' src={props.item.image} alt={props.item.name}/>
      <div className={`${styles.price} mb-2`}>
        <p className={'text text_type_digits-default pr-2'}>{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{props.item.name}</h3>
      <Counter count={0} size="default" />
    </a>
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