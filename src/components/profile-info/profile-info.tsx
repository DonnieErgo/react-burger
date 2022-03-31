import styles from './profile-info.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { resetError, authSelector } from '../../services/slices/auth'
import { useDispatch, useSelector } from 'react-redux'

export const ProfileInfo = () => {

  const dispatch = useDispatch()
  const { error } = useSelector(authSelector)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:''
  })

  useEffect(() => {
    dispatch(resetError())
  }, [])

  const changeFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className={`${styles.form}`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={changeFormData}
          icon={'EditIcon'}
          value={formData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          name={'email'}
          placeholder={'E-mail'}
          onChange={changeFormData}
          icon={'EditIcon'}
          value={formData.email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'password'}
          name={'password'}
          placeholder={'Пароль'}
          onChange={changeFormData}
          icon={'EditIcon'}
          value={formData.password}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />

      { error && <span className={`${styles.error} text text_type_main-medium mb-4`}>{error}</span> }

      <div className={styles.wrap}>
        <Button type={"primary"} size={"medium"}>Сохранить</Button>
        <Button type={"secondary"} size={"medium"} onClick={null}>Отмена</Button>
      </div>
    </section>
  )
}