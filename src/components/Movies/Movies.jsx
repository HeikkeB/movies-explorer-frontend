import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './Movies.css'

export default function Movies() {
  return (
    <section className='movies'>
        <SearchForm />
        <MoviesCardList />
    </section>
  )
}
