import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './SearchForm.css'
import searchIcon from '../../images/searcher_icon.svg'

export default function SearchForm() {
    const [search, setSearch] = useState('')
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
        setSearch('')
    }



  return (
    <section className='search-form'>
        <div className='search-form__container'>
            <form className='search-form__searcher' onSubmit={handleSubmit(() => {
                handleSubmitSearch();
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
            <div className='search-form__shortfilm'>
                <p className='search-form__shortfilm-title'>Короткометражки</p>
                <label class="search-form__switch" for="checkbox">
                    <input className='search-form__switch-input' type="checkbox" id="checkbox" />
                    <div class="search-form__slider search-form__round"></div>
                </label>
            </div>          
        </div>
            <div className='search-form__bottom-line'></div>
    </section>
  )
}
