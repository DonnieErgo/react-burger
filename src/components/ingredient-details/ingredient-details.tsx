import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = props => {
  return (
  <>
    <h2 className={`${styles.title} mt-4 text text_type_main-large`}>Детали ингредиента</h2>
    <img className={styles.img} src={props.item.image} alt={props.item.name}/>
    <h3 className={'text text_type_main-medium mt-8 mb-8'}>{props.item.name}</h3>
    <div>
      <ul className={styles.info}>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Калории,ккал
          <p className="text text_type_digits-default">{props.item.calories}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Белки, г
          <p className="text text_type_digits-default">{props.item.proteins}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Жиры, г
          <p className="text text_type_digits-default">{props.item.fat}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Углеводы, г
          <p className="text text_type_digits-default">{props.item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  </>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  }),
  item: PropTypes.object.isRequired,
}

export default IngredientDetails