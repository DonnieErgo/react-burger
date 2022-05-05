import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css'
import { resetError, resetPassword, authSelector } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TLocation, TResetPasswordData } from '../../utils/types'

export const ResetPassword: FC = () => {

  const dispatch = useAppDispatch()
  const { resetPassRequestSuccess, error, auth, forgotPassRequestSuccess } = useAppSelector(authSelector)
  const location = useLocation<TLocation>()
  const [formData, addFormData] = useState<TResetPasswordData>({
    password: '',
    token: ''
  })

  useEffect(() => {
    dispatch(resetError())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetErrorOnFocus = () => {
    dispatch(resetError())
  }

  const sendForm = (e: FormEvent) => {
    e.preventDefault()
    dispatch(resetPassword(formData))
  }

  if (!forgotPassRequestSuccess) {
    return (
      <Redirect to='/forgot-password' />
    )
  }

  if (resetPassRequestSuccess) {
    return (
      <Redirect to='/login' />
    )
  }

  if (auth) {
    return (
      <Redirect to={location?.state?.from || '/' } />
    )
  }

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