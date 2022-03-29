import { Redirect, Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, authSelector } from '../../services/slices/auth'

export const ForgotPassword = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  // const { requestingForgotPassword } = useSelector(authSelector)
  const [email, addEmail] = useState('')

  // useEffect(() => {
  //   dispatch(resetRequestingResetPassword())
  // }, [])

  const sendForm = e => {
    e.preventDefault()
    // @ts-ignore
    dispatch(forgotPassword(email)).then(res => {
      res.payload.success && history.push('/reset-password')
    })
  }

  // if (requestingForgotPassword) {
  //   return (
  //     <Redirect to='/reset-password' />
  //   )
  // }

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

        {/* Добавить спан с ошибкой (при регистрации того же юзера) по стейту и самоочищение
        на остальные страницы тоже */}

        <div className={`${styles.line} mb-4 text_type_main-medium`}>
          <span className='text_type_main-default'>Вспомнили пароль?</span>
          <Link to='/login' className={`${styles.link} ml-2 text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}