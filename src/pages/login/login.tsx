import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

export const Login = () => {

  const [formData, addFormData] = useState({
    email: '',
    password: ''
  });

  const changeFormData = e => {
    addFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Вход</h1>
        <form id='login-form' className={`${styles.form} mb-20`} onSubmit={null}>
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