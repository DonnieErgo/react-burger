import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';

export const ResetPassword = () => {

  const [formData, addFormData] = useState({
    code: '',
    password: ''
  })

  const changeFormData = e => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Восстановление пароля</h1>
        <form id='forgot-password-form' className={`${styles.form} mb-20`} onSubmit={null}>
          <PasswordInput 
            onChange={changeFormData}
            value={formData.password}
            name={'password'} />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={changeFormData}
            value={formData.code}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
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