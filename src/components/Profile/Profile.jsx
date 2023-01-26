import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './Profile.css'

export default function Profile() {
    const [username, setUsername] = useState('Виталий')
    const [email, setEmail] = useState('pochta@yandex.ru')
    const {
        register,
        formState: {
            errors, isValid,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    })

  return (
    <section className='profile'>
    <form className='profile__form'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
            <div className='profile__input-container'>
                <label className='profile__input-label'>
                    <span className='profile__input-name'>Имя</span>
                    <input 
                        className={errors?.username ? 'profile__input_error' : 'profile__input'}
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
                    <div className='profile__input-error'> {
                    errors?.username && <span className='profile__input-error-text'>{errors?.username?.message || 'Что-то пошло не так...'}</span>
                    }</div>
                </label>
                <div className='profile__line'></div>
                <label className='profile__input-label'>
                    <span className='profile__input-name'>E-mail</span>
                    <input 
                        className={errors?.email ? 'profile__input_error' : 'profile__input'}
                        type='email'
                        {...register('email', {
                                required: 'Обязательное поле',
                                pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Некорректный емайл'
                        },
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='profile__input-error'> {
                    errors?.email && <span className='profile__input-error-text'>{errors?.email?.message || 'Что-то пошло не так...'}</span>
                    }</div>
                </label>
            </div>
            <div className='profile__btn-container'>
                <button className='profile__btn profile__btn_edit animation-link' type='submit'>Редактировать</button>
                <button className='profile__btn profile__btn_exit animation-link' type='submit'>Выйти из аккаунта</button>
            </div>
    </form>

    </section>
  )
}
