import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteIngredientFromCart, dragIngredients } from '../../services/slices/ingredients'
import { useDrag, useDrop } from "react-dnd"
import { useRef } from 'react'

const ConstructorItem = ({ item, index }) => {
  const dispatch = useDispatch()

  // Нужно найти какое-то читаемое решение по sortable list

  const ref = useRef(null)

  type itemHanlder = {
    id: number,
    handlerId: number,
    index: number
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'cartIngredient',
    item: () => ({ item, index }),
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() })
  })

  const [action, drop] = useDrop<itemHanlder>({
    accept: 'cartIngredient',
    collect: monitor => ({ handlerId: monitor.getHandlerId() }),
    hover: (item, monitor) => {
      if (!ref.current) return
      
      const dragIndex = item.id
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch(dragIngredients({drag: dragIndex, hover: hoverIndex }))
      item.index = hoverIndex
    }
  })

  const opacity = isDragging ? 0.2 : 1

  drag(drop(ref))

  return (
    <li style={{ opacity }} 
        data-handler-id={action}
        ref={ref} 
        draggable
        className={`${styles.ingr} mr-3 mb-4`} >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>  dispatch(deleteIngredientFromCart(item))} />
    </li>
  )
}

ConstructorItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
}

export default ConstructorItem