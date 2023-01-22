import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Register.css'
import headerLogo from '../../images/header_logo.svg'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailValidation = email => 
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    const {
        register,
        formState: {
            errors, isValid,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const handleSubmitReg = () => {
        setUsername('')
        setEmail('')
        setPassword('')
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
                    className='register__input' 
                    placeholder='Имя'
                    type='text'
                    {...register('username', {
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className='register__input-error'>{
                    errors?.username && <span className='register__input-error-text'>{errors?.username?.message || 'Что-то пошло не так...'}</span>
                    }</div>
            </section>
            <section className='register__field'>
                <span className='register__input-name'>E-mail</span>
                <input 
                    className='register__input' 
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
                    className='register__input' 
                    placeholder='Пароль'
                    type='password'
                    {...register('password', {
                        required: 'Обязательное поле',
                    })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='register__input-error'>{errors?.password && <span className='register__input-error-text'>{errors?.password?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
                <button className='register__button' type='submit'>Зарегистрироваться</button>
            </form>
            <div className='register__links'>
            <p className='register__link-description'>Уже зарегистрированы?</p>
            <Link to='/signin' className='register__link'>Войти</Link>
            </div>
        </div>
    </div>
  )
}
