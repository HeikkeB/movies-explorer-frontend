import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Register.css'
import headerLogo from '../../images/header_logo.svg'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {
        register,
        formState: {
            errors, isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const handleSubmitReg = (evt) => {
        evt.preventDefault();
        reset();
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
                <span className='register__input-name'>Имя</span>
                <input 
                    className='register__input' 
                    placeholder='Email'
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
                <div className='register__input-error'>{errors?.username && <span className='register__input-error-text'>{errors?.username?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
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
                <div className='register__input-error'>{errors?.username && <span className='register__input-error-text'>{errors?.username?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
                <button className='register__button'></button>
            </form>
            <div className='register__links'>
            <p className='register__link-description'>Уже зарегистрированы?</p>
            <Link to='/signin' className='register__link'>Войти</Link>
            </div>
        </div>
    </div>
  )
}
