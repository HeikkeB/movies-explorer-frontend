import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { currentUserContext } from '../../context/CurrentUserContext'
import './Profile.css'

export default function Profile({ signOut, handleUpdateUser }) {
    const [username, setUsername] = useState('Виталий')
    const [email, setEmail] = useState('pochta@yandex.ru')
    const currentUser = useContext(currentUserContext)
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    })

    const handleSubmitProfile =() => {
        handleUpdateUser(username, email)
    }

  return (
    <section className='profile'>
    <form className='profile__form' onSubmit={handleSubmit(() => { handleSubmitProfile() })} >
        <h2 className='profile__title'>{`Привет, ${currentUser.name || ''}!`}</h2>
            <div className='profile__input-container'>
                <label className='profile__input-label'>
                    <span className='profile__input-name'>Имя</span>
                    <input 
                        className={errors?.username ? 'profile__input_error' : 'profile__input'}
                        type='text'
                        {...register('username', {
                                required: 'обязательное поле',
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
                                required: 'обязательное поле',
                                pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'некорректный емайл'
                        },
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='profile__input-error-email'> {
                    errors?.email && <span className='profile__input-error-text-email'>{errors?.email?.message || 'Что-то пошло не так...'}</span>
                    }</div>
                </label>
            </div>
            <div className='profile__btn-container'>
                <button className='profile__btn profile__btn_edit animation-link' type='submit'>Редактировать</button>
                <Link to='/'>
                <button className='profile__btn profile__btn_exit animation-link' onClick={signOut}>Выйти из аккаунта</button>
                </Link>
            </div>
    </form>

    </section>
  )
}
