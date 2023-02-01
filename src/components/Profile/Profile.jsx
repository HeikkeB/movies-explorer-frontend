import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { currentUserContext } from '../../context/CurrentUserContext'
import './Profile.css'

export default function Profile({ signOut, handleUpdateUser }) {
    const currentUser = useContext(currentUserContext)
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
            name: currentUser.name,
            email: currentUser.email,
        },
        mode: 'onChange',
    })

    const name = watch('name', currentUser.name)
    const email = watch('email')

    const handleSubmitProfile =() => {
        handleUpdateUser({name, email})
    }

  return (
    <section className='profile'>
    <form className='profile__form' onSubmit={handleSubmit(() => { handleSubmitProfile() })} >
        <h2 className='profile__title'>{`Привет, ${currentUser.name || ''}!`}</h2>
            <div className='profile__input-container'>
                <label className='profile__input-label'>
                    <span className='profile__input-name'>Имя</span>
                    <input 
                        className={errors?.name ? 'profile__input_error' : 'profile__input'}
                        type='text'
                        {...register('name', {
                                required: 'обязательное поле',
                            minLength: {
                                value: 2,
                                message: 'минимум 2 символа'
                            },
                            maxLength: {
                                value: 20,
                                message: 'максимум 20 символов'
                            },
                            pattern: {
                            value: /^[A-Za-zА-Яа-яЁё /h -]+$/,
                            message: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис'
                        }
                        })}
                        value={name}
                    />
                    <div className='profile__input-error'> {
                    errors?.name && <span className='profile__input-error-text'>{errors?.name?.message || 'Что-то пошло не так...'}</span>
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
                    />
                    <div className='profile__input-error-email'> {
                    errors?.email && <span className='profile__input-error-text-email'>{errors?.email?.message || 'Что-то пошло не так...'}</span>
                    }</div>
                </label>
            </div>
            <div className='profile__btn-container'>
                <button className={ isValid ? (
                        'profile__btn animation-link profile__btn_active'
                            ) : (
                                'profile__btn animation-link profile__btn_unactive' 
                                )} 
                            type='submit'
                        disabled={!isValid}>
                    Редактировать
                </button>
                <Link to='/'>
                <button className='profile__btn profile__btn_exit animation-link' onClick={signOut}>Выйти из аккаунта</button>
                </Link>
            </div>
    </form>

    </section>
  )
}
