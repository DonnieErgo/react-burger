import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css'
import { resetError, authSelector, loginRequest, resetResetPassRequestSuccess, resetForgotPassRequestSuccess } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { TLocation, TLoginData } from '../../utils/types'
import { FC } from 'react'

export const Login: FC = () => {

  const dispatch = useAppDispatch()
  const { error, auth } = useAppSelector(authSelector)
  const location = useLocation<TLocation>()
  const [formData, addFormData] = useState<TLoginData>({
    email: '',
    password: ''
  })

  useEffect(() => {
    dispatch(resetError())
    dispatch(resetResetPassRequestSuccess())
    dispatch(resetForgotPassRequestSuccess())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const sendForm = (e: FormEvent) => {
    e.preventDefault()
    dispatch(loginRequest(formData))
  }

  if (auth) {
    return (
      <Redirect to={location?.state?.from || '/' } />
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Вход</h1>
        <form id='login-form' className={`${styles.form} mb-20`} onSubmit={sendForm}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
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

          <Button type='primary' size='medium'>Войти</Button>
        </form>
        <div className={`${styles.line} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Вы — новый пользователь?</span>
          <Link to='/register' className={`${styles.link} ml-2 text_type_main-default`}>Зарегистрироваться</Link>
        </div>
        <div className={`${styles.line} text_type_main-medium`}>
          <span className='text_type_main-default'>Забыли пароль?</span>
          <Link to='/forgot-password' className={`${styles.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  )
}