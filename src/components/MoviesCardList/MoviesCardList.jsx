import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

export default function MoviesCardList({ savedMoviesList, moviesList }) {
  const [ showMovieList, setShowMovieList ] = useState([])
  const [showDetails, setShowDetails] = useState({ total: 12, more: 3 })

  const location = useLocation()

  useEffect(() => {
    if(moviesList.length) {
      const res = moviesList.filter((item, i) => i < showDetails.total)
      setShowMovieList(res)
    }

  }, [moviesList, showDetails.total]);

  return (
    <section className='movies-card-list'>
    <ul className='movies-card-list__list'>
      {showMovieList.map((movie) => (
        <MoviesCard key={movie.id || movie._id} movie={movie} />
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
