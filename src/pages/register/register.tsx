import { Link, Redirect, useLocation } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
import { registerUser, authSelector, resetError } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TLocation, TRegisterData } from '../../utils/types'

export const Register: FC = () => {

  const { error, auth } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const location = useLocation<TLocation>()
  const [formData, addFormData] = useState<TRegisterData>({
    name: '',
    email: '',
    password: ''
  })

  const changeFormData = (e: { target: { name: string; value: string } }) => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(resetError())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetErrorOnFocus = () => {
    dispatch(resetError())
  }

  const reg = (e: FormEvent) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  if (auth) {
    return (
      <Redirect to={location?.state?.from || '/' } />
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