import done from '../../images/done.png'

const OrderDetails = props => {
  return (
    <>
      <div className={`mt-20 text text_type_digits-large`}>034536</div>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img className={`mt-15 mb-15`} src={done} alt="Готово!"/>
      <p className={`text text_type_main-default mt-4`}>Ваш заказ начали готовить</p>
      <p className={`mt-2 mb-15 text text_type_main-default text_color_inactive`}>Дождитесь готовности на&nbsp;орбитальной станции</p>
    </>
  )
}

export default OrderDetails