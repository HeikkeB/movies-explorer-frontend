import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.css'
import headerLogo from '../../images/header_logo.svg'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        setEmail('')
        setPassword('')
    }

  return (
 <div className='login'>
        <div className='login__container'>
            <img className='login__logo' src={headerLogo} alt='логотип'></img>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form' onSubmit={handleSubmit(() => {
                handleSubmitReg();
            })}>
            <section className='login__field'>
                <span className='login__input-name'>E-mail</span>
                <input 
                    className='login__input' 
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
                <div className='login__input-error'>{errors?.email && <span className='login__input-error-text'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
            <section className='login__field'>
                <span className='login__input-name'>Пароль</span>
                <input 
                    className='login__input' 
                    placeholder='Пароль'
                    type='password'
                    {...register('password', {
                        required: 'Обязательное поле',
                    })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='login__input-error'>{errors?.password && <span className='login__input-error-text'>{errors?.password?.message || 'Что-то пошло не так...'}</span>}</div>
            </section>
                <button className='login__button' type='submit'>Войти</button>
            <div className='login__links'>
            <p className='login__link-description'>Ещё не зарегистрированы?</p>
            <Link to='/signup' className='login__link'>Регистрация</Link>
            </div>
            </form>
        </div>
    </div>
  )
}
