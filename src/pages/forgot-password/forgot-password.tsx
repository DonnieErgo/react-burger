import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';

export const ForgotPassword = () => {

  const [email, addEmail] = useState('');

  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <h1 className={`${styles.title} mb-6 text_type_main-medium`}>Восстановление пароля</h1>
        <form id='forgot-password-form' className={`${styles.form} mb-20`} onSubmit={null}>
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