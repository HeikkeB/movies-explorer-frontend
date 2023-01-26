import React from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

export default function MoviesCardList() {
  const [ showMovie, setShowMovie ] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const location = useLocation()
  return (
    <section className='movies-card-list'>
    <ul className='movies-card-list__list'>
      {showMovie.map((movie, index) => (
        <MoviesCard key={index} movie={movie} />
      ))}
    </ul>
    {
      location.pathname === '/movies' ? (
        <button className='movies__yet-btn animation-btn'>Ещё</button>
      ) : (undefined)   
    }
    
    </section>
  )
}
