import styles from './ingredient-details.module.css';

const IngredientDetails = ({ item }) => {
  return (
  <>
    <img className={`${styles.img} mt-8`} src={item.image} alt={item.name}/>
    <h3 className={'text text_type_main-medium mt-8 mb-8'}>{item.name}</h3>
    <div>
      <ul className={styles.info}>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Калории,ккал
          <p className="text text_type_digits-default">{item.calories}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Белки, г
          <p className="text text_type_digits-default">{item.proteins}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Жиры, г
          <p className="text text_type_digits-default">{item.fat}</p>
        </li>
        <li className={`${styles.item} text text_type_main-default text_color_inactive`}>Углеводы, г
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  </>
  )
}

export default IngredientDetails