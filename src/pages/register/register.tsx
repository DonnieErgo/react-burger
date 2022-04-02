import { Link, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
import { registerUser, authSelector, resetError } from '../../services/slices/auth'
import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {

  const { error, auth } = useSelector(authSelector)
  const dispatch = useDispatch()
  const [formData, addFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const changeFormData = e => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(resetError())
  }, [])

  const resetErrorOnFocus = () => {
    dispatch(resetError())
  }

  const reg = e => {
    e.preventDefault()
    // @ts-ignore
    dispatch(registerUser(formData))
  }

  if (auth) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Регистрация</h1>
        <form id='register-form' className={`${styles.form} mb-20`} onSubmit={reg}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onFocus={resetErrorOnFocus}
            onChange={changeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onFocus={resetErrorOnFocus}
            onChange={changeFormData}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
          <PasswordInput 
            onChange={changeFormData}
            value={formData.password}
            name={'password'} />
          
          { error && <span className={`${styles.error} text text_type_main-medium mb-4`}>{error}</span> }

          <Button type='primary' size='medium'>Зарегистрироваться</Button>
        </form>
        <div className={`${styles.line} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Уже зарегистрированы?</span>
          <Link to='/login' className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}