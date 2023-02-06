import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'

export default function MoviesCardList({ savedMoviesList, moviesList }) {
  const [ showMoviesList, setShowMoviesList ] = useState([])
  const [showDetails, setShowDetails] = useState({ total: 12, more: 3 })

  const location = useLocation()

  useEffect(() => {
    if(moviesList.length) {
      const res = moviesList.filter((item, i) => i < showDetails.total)
      setShowMoviesList(res)
    }

  }, [moviesList, showDetails.total]);

  function handleMoreBtn() {
    const start = showMoviesList.length
    const end = start + showDetails.more
    const more = moviesList.length - start

    if(more > 0) {
      const newMovies = moviesList.slice(start, end)
      setShowMoviesList([...showMoviesList, ...newMovies])
    }
  }

  return (
    <section className='movies-card-list'>
    <ul className='movies-card-list__list'>
      {showMoviesList.map((movie) => (
        <MoviesCard key={movie.id || movie._id} movie={movie} />
      ))}
    </ul>
    {
      location.pathname === '/movies' ? (
        <button className='movies__yet-btn animation-btn' onClick={handleMoreBtn}>Ещё</button>
      ) : (undefined)   
    }
    
    </section>
  )
}
