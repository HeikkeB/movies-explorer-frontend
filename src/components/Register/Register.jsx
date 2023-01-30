import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Register.css'
import headerLogo from '../../images/header_logo.svg'

export default function Register({ handleRegister }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate();
    const {
        register,
        formState: {
            errors, isValid,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        setName('')
        setEmail('')
        setPassword('')
    }, [])

    const handleSubmitReg = () => {
        handleRegister({ name, email, password }) 
    }

  return (
    <div className='register'>
        <div className='register__container'>
            <img className='register__logo' src={headerLogo} alt='логотип'></img>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form' onSubmit={handleSubmit(() => {
                handleSubmitReg();
            })}>
            <section className='register__field'>
                <span className='register__input-name'>Имя</span>
                <input 
                    className={errors?.name ? 'register__input_error' : 'register__input'}
                    placeholder='Имя'
                    type='text'
                    {...register('name', {
                        required: 'Обязательное поле',
                        minLength: {
                            value: 2,
                            message: 'минимум 2 символа'
                        },
                        maxLength: {
                            value: 20,
                            message: 'максимум 20 символов'
                        },
                    })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className='register__input-error'>{
                    errors?.name && <span className='register__input-error-text'>{errors?.name?.message || 'Что-то пошло не так...'}</span>
                    }</div>
            </section>
            <section className='register__field'>
                <span className='register__input-name'>E-mail</span>
                <input 
                    className={errors?.email ? 'register__input_error' : 'register__input'}
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='register__input-error'>{errors?.email && <span className='register__input-error-text'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
            <section className='register__field'>
                <span className='register__input-name'>Пароль</span>
                <input 
                    className={errors?.password ? 'register__input_error' : 'register__input'} 
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='register__input-error'>{errors?.password && <span className='register__input-error-text'>{errors?.password?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
                <button className='register__button animation-btn' type='submit'>Зарегистрироваться</button>
            <div className='register__links'>
            <p className='register__link-description'>Уже зарегистрированы?</p>
            <Link to='/signin' className='register__link animation-link'>Войти</Link>
            </div>
            </form>
        </div>
    </div>
  )
}
