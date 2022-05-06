import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-item.module.css'
import { deleteIngredientFromCart, dragIngredients } from '../../services/slices/ingredients'
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from "react-dnd"
import { useRef } from 'react'
import { useAppDispatch } from '../../services/store'
import { TIngredient } from '../../utils/types'
import { FC } from 'react'

type TConstructorItemProps = {
  readonly item: TIngredient,
  readonly index: number,
};

const ConstructorItem: FC<TConstructorItemProps> = ({ item, index }) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLLIElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'cartIngredient',
    item: () => ({ item, index }),
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() })
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'cartIngredient',
    collect: monitor => ({ handlerId: monitor.getHandlerId() }),
    drop: (item: TIngredient) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return
      dispatch(dragIngredients({drag: dragIndex, hover: hoverIndex }))
    },
    hover: (item: TIngredient, monitor: DropTargetMonitor) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch(dragIngredients({ drag: dragIndex, hover: hoverIndex }))
      item.index = hoverIndex
    }
  })

  const opacity = isDragging ? 0.2 : 1

  drag(drop(ref))

  return (
    <li style={{ opacity }} 
        data-handler-id={handlerId}
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

export default ConstructorItem