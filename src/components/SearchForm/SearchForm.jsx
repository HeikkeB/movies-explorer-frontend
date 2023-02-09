import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import './SearchForm.css'
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox'
import searchIcon from '../../images/searcher_icon.svg'
import { currentUserContext } from '../../context/CurrentUserContext'

export default function SearchForm({ searchMovies, filteredShortMovies, shortMovies }) {

    const currentUser = useContext(currentUserContext)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - moviesSearch`)) {
            localStorage.getItem(`${currentUser.email} - moviesSearch`)
        }
    }, [currentUser.email, location.pathname])

    const {
        register,
        watch,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const search = watch('search', '')

    const handleSubmitSearch = () => {
        searchMovies(search)
    }

  return (
    <section className='search-form'>
        <div className='search-form__container'>
            <form className='search-form__searcher' onSubmit={handleSubmit(() => {
                handleSubmitSearch()
                })}>
                <input className='search-form__input'
                    placeholder='Фильм'
                    type='text'
                    {...register('search', {
                        required: 'Нужно ввести ключевое слово',
                        maxLength: {
                            value: 40,
                            message: 'максимум 40 символов'
                        },
                    })}
                    value={search}
                />
                <div className='search-form__input-error'>{
                    errors?.search && <span className='search-form__input-error-text'>{errors?.search?.message || 'Что-то пошло не так...'}</span>
                    }</div>
                <button className='search-form__button animation-btn' type='submit'>
                    <img className='search-form__button-img' src={searchIcon} alt='поиск'/>
                </button>
            </form>
            <FilterCheckBox shortMovies={shortMovies} filteredShortMovies={filteredShortMovies} />
        </div>
            <div className='search-form__bottom-line'></div>
    </section>
  )
}
