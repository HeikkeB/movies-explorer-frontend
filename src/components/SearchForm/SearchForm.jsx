import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import './SearchForm.css'
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox'
import searchIcon from '../../images/searcher_icon.svg'
import { currentUserContext } from '../../context/CurrentUserContext'

export default function SearchForm({ searchMovies, filteredShortMovies, shortMovies }) {
    const [search, setSearch] = useState('')

    const currentUser = useContext(currentUserContext)
    const location = useLocation()
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const handleSubmitSearch = () => {
        searchMovies(search)
    }

    useEffect(() => {
        if (
            location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - moviesSearch`)
        ) {
            setSearch(localStorage.getItem(`${currentUser.email} - moviesSearch`))
        }
    }, [currentUser])

    // useEffect(() => {
    //     if(
    //         location.pathname === '/movies' && !search
    //     ) {
    //         console.log('not found')
    //     }
    // }, [location.pathname, search, currentUser.email])

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
                        required: 'Напишите что-то в поиске',
                        maxLength: {
                            value: 40,
                            message: 'максимум 40 символов'
                        },
                    })}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
