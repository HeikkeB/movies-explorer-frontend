import React from 'react'
import './SearchForm.css'
import searchIcon from '../../images/searcher_icon.svg'

export default function SearchForm() {
  return (
    <section className='search-form'>
        <div className='search-form__container'>
            <form className='search-form__searcher'>
                <input className='search-form__input' placeholder='Фильм'/>
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
