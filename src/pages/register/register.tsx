import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';

export const Register = () => {

  const [formData, addFormData] = useState({
    name: '',
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
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Регистрация</h1>
        <form id='register-form' className={`${styles.form} mb-20`} onSubmit={null}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={changeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'} />
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