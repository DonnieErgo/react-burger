import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css'
import { resetError, resetPassword, authSelector } from '../../services/slices/auth'

export const ResetPassword = () => {

  const dispatch = useDispatch()
  const { resetPassRequestSuccess, error, auth } = useSelector(authSelector)
  const [formData, addFormData] = useState({
    password: '',
    token: ''
  })

  useEffect(() => {
      dispatch(resetError())
  }, [])

  const changeFormData = e => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetErrorOnFocus = () => {
    dispatch(resetError())
  }

  const sendForm = e => {
    e.preventDefault()
    // @ts-ignore
    dispatch(resetPassword(formData))
  }

  if (resetPassRequestSuccess) {
    return (
      <Redirect to='/login' />
    )
  }

  if (auth) {
    return (
      <Redirect to='/' />
    )
  }

  // if (!location.state || (location.state && location.state.from.pathname !== '/forgot-password')) {
  //   return (
  //     <Redirect to={'/forgot-password'}/>
  //   )
  // }

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Восстановление пароля</h1>
        <form id='forgot-password-form' className={`${styles.form} mb-20`} onSubmit={sendForm}>
          <PasswordInput 
            onChange={changeFormData}
            value={formData.password}
            name={'password'} />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={changeFormData}
            onFocus={resetErrorOnFocus}
            value={formData.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />

          { error && <span className={`${styles.error} text text_type_main-medium mb-4`}>{error}</span> }

          <Button type='primary' size='medium'>Сохранить</Button>
        </form>
        <div className={`${styles.line} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Вспомнили пароль?</span>
          <Link to='/login' className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}