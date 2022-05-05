import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css'
import { forgotPassword, authSelector, resetError } from '../../services/slices/auth'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { FC } from 'react'
import { TLocation } from '../../utils/types'

export const ForgotPassword: FC = () => {

  const dispatch = useAppDispatch()
  const { forgotPassRequestSuccess, auth } = useAppSelector(authSelector)
  const [email, addEmail] = useState<string>('')
  const location = useLocation<TLocation>()

  const sendForm = (e: FormEvent) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    dispatch(resetError())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (forgotPassRequestSuccess) {
    return (
      <Redirect to='/reset-password' />
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
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => addEmail(e.target.value)}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
          <Button type='primary' size='medium'>Восстановить</Button>
        </form>
        <div className={`${styles.line} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Вспомнили пароль?</span>
          <Link to='/login' className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}