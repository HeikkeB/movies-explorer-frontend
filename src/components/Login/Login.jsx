import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.css'
import headerLogo from '../../images/header_logo.svg'

export default function Login({ handleLogin }) {
    const {
        register,
        watch,
        formState: {
            errors, 
            isValid,
        },
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const email = watch('email')
    const password = watch('password')

    function handleSubmitReg() {
        handleLogin({ email, password })
    }

  return (
 <div className='login'>
        <div className='login__container'>
        <Link to='/'>
            <img className='login__logo' src={headerLogo} alt='логотип'></img>
        </Link>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form' onSubmit={handleSubmit(() => {
                handleSubmitReg();
            })}>
            <section className='login__field'>
                <span className='login__input-name'>E-mail</span>
                <input 
                    className={errors?.email ? 'login__input_error' : 'login__input'}
                    placeholder='Email'
                    type='text'
                    {...register('email', {
                        required: 'Обязательное поле',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Некорректный емайл'
                        }
                    })}
                    value={email}
                />
                <div className='login__input-error'>{errors?.email && <span className='login__input-error-text'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
            <section className='login__field'>
                <span className='login__input-name'>Пароль</span>
                <input 
                    className={errors?.password ? 'login__input_error' : 'login__input'}
                    placeholder='Пароль'
                    type='password'
                    {...register('password', {
                        required: 'Обязательное поле',
                        minLength: {
                            value: 4,
                            message: 'минимум 4 символа'
                        },
                        maxLength: {
                            value: 30,
                            message: 'максимум 30 символов'
                        },
                    })}
                    value={password}
                />
                <div className='login__input-error'>{errors?.password && <span className='login__input-error-text'>{errors?.password?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
                <button className={
                    isValid ? (
                        'login__button animation-btn login__button_active'
                        ) : (
                        'login__button login__button_unactive'
                        )} 
                        type='submit'>
                        Войти
                </button>
            <div className='login__links'>
            <p className='login__link-description'>Ещё не зарегистрированы?</p>
            <Link to='/signup' className='login__link animation-link'>Регистрация</Link>
            </div>
            </form>
        </div>
    </div>
  )
}
