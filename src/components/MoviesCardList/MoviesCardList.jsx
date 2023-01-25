import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

export default function MoviesCardList() {
  const [ showMovie, setShowMovie ] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  return (
    <section className='movies-card-list'>
    <ul className='movies-card-list__list'>
      {showMovie.map((movie, index) => (
        <MoviesCard key={index} movie={movie} />
      ))}
    </ul>
    </section>
  )
}
